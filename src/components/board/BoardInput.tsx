import { useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { BoardDataSchema } from "@/types/schema/BoardSchema";
import { useBoard } from "@/hooks/useBoard";
import { ElementRef, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useOnClickOutside } from 'usehooks-ts'
import { useRouter } from "next/navigation";

interface FormValues {
  title: string;
}

interface BoardInputFormProps {
  initialValues: FormValues;
  mode: "create" | "update";
  id?: string;
  pathname?: string
}

const BoardInputForm = ({ initialValues, mode, id, pathname }: BoardInputFormProps) => {
  const [error, setErrors] = useState<string>("");
  const { createBoard, updateBoard, isPendingUpdate , stopEditingBoard} = useBoard({id});
  const { toast } = useToast();
  const formRef = useRef<ElementRef<"form">>(null)
  const router = useRouter()

  const form = useForm({
    defaultValues: initialValues,
    validatorAdapter: valibotValidator(),
    onSubmit: async ({ value }) => {
      let response;
      if (mode === "update") {
        response = await updateBoard(value);
        if (response.error) {
          setErrors(response.error);
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: response.error,
          });
          return;
        }
        toast({
          className: "bg-green-500",
          description: `"${response.data?.title}" board updated`,
        });
        stopEditingBoard({pageRoute: pathname as string,id: id as string});
        return;
      } else {
        response = await createBoard(value);
        if (response.error) {
          setErrors(response.error);
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: response.error,
          });
          return;
        }
        toast({
          className: "bg-green-500",
          description: `"${response.data?.title}" board created`,
        });
        router.push(`/dashboard/${response.data?.id}`);
      }
    },
  });

  const handleClickOutside = () => {
    const isPristine = form.state.isPristine
    const isDirty = form.state.isDirty
    const isValid = form.state.isValid

    if (isPristine) {
      stopEditingBoard({pageRoute: pathname as string,id: id as string});
      return ;
    }

    if (isDirty && isValid) {
      form.handleSubmit()
    }
   
  }

  useOnClickOutside(formRef, handleClickOutside)

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="px-2 pb-2"
      >
        <form.Field
          name="title"
          asyncDebounceMs={500}
          validators={{
            onChange: BoardDataSchema.entries.title,
            onChangeAsyncDebounceMs: 500,
          }}
          children={(field) => {
            return (
              <div>
                <Label
                  htmlFor={field.name}
                  className="font-medium text-sm mb-2"
                ></Label>
                <div className="flex w-full justify-center items-end gap-2">
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isPendingUpdate}
                    className="mt-1 w-full p-3 "
                  />
                  {mode === "create" && (
                    <form.Subscribe
                      selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                      ]}
                      children={([canSubmit, isSubmitting]) => (
                        <Button
                          className="flex-grow ml-3 items-center px-4 py-2 font-semibold text-xs uppercase tracking-widest bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white hover:from-pink-500 hover:to-violet-500 disabled:opacity-25 transition ease-in-out duration-150"
                          disabled={!canSubmit}
                        >
                          {isSubmitting ? (
                            <p className="flex gap-2">
                              <LoaderCircle
                                size={20}
                                className="animate-spin"
                              />{" "}
                              Create
                            </p>
                          ) : (
                            "Create"
                          )}
                        </Button>
                      )}
                    />
                  )}
                </div>
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em className="text-xs text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            );
          }}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default BoardInputForm;
