import { useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { CardDataSchema } from "@/types/schema/CardSchema";
import { useCard } from "@/hooks/useCard";
import { ElementRef, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useOnClickOutside } from "usehooks-ts";


interface FormValues {
  title: string;
}

interface CardInputFormProps {
  initialValues: FormValues;
  mode: "create" | "update";
  id?: string;
  boardId: string;
  onCreateComplete?: () => void;
}
const CardInput = ({
  initialValues,
  mode,
  id,
  boardId,
  onCreateComplete
}: CardInputFormProps) => {
  const [error, setErrors] = useState<string>("");
  const { createCard,isPendingCreate , updateCard, isPendingUpdate, stopEditingCard } = useCard({
    id,
  });
  const { toast } = useToast();
  const formRef = useRef<ElementRef<"form">>(null);
 

  const form = useForm({
    defaultValues: initialValues,
    validatorAdapter: valibotValidator(),
    onSubmit: async ({ value }) => {
      let response;
      let newValue = {...value, boardId}

      if (mode === "update") {
        response = await updateCard(newValue);
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
          description: `"${response.data?.title}" card updated`,
        });
        stopEditingCard({ id: id as string });
        return;
      } else {
        response = await createCard(newValue);
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
          description: `"${response.data?.title}" card created`,
        });
        if (onCreateComplete) {
          onCreateComplete();
        }
        form.reset();
      }
    },
  });

  const handleClickOutside = () => {
    const isPristine = form.state.isPristine
    const isDirty = form.state.isDirty
    const isValid = form.state.isValid

    if (isPristine) {
      stopEditingCard({id: id as string});
      if (onCreateComplete) {
        onCreateComplete();
      }
      return ;
    }

    if (isDirty && isValid) {
      form.handleSubmit()
    }
   
  }

  useOnClickOutside(formRef, handleClickOutside)


  return <div>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="p-2"
      >
        <form.Field
          name="title"
          asyncDebounceMs={500}
          validators={{
            onChange: CardDataSchema.entries.title,
            onChangeAsyncDebounceMs: 500,
          }}
          children={(field) => {
            return (
              <div>
                <Label
                  htmlFor={field.name}
                  className="font-medium text-sm"
                  hidden
                >title</Label>
                <div>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isPendingUpdate || isPendingCreate}
                    className="w-full"
                  />
                  {mode === "create" && (
                    <form.Subscribe
                      selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                      ]}
                      children={([canSubmit, isSubmitting]) => (
                        <Button
                          className="font-semibold mt-2 text-xs uppercase tracking-widest bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white hover:from-pink-500 hover:to-violet-500 disabled:opacity-25 transition ease-in-out duration-150"
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
    </div>;
};

export default CardInput;
