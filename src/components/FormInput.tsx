import { useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { BoardDataSchema } from "@/types/schema/BoardSchema";
import { useBoard } from "@/hooks/useBoard";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

const FormInput = () => {
  const [error, setErrors] = useState<string>("");
  const { createBoard } = useBoard({});

  const form = useForm({
    defaultValues: {
      title: "",
    },
    validatorAdapter: valibotValidator(),
    onSubmit: async ({ value }) => {
      const response = await createBoard(value);
      if (!response) {
        setErrors(response);
      }
    },
  });
  return (
    <div>
      <form
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
                >
                  Title
                </Label>
                <div className="flex justify-center items-end gap-2">
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 w-full p-3 "
                  />
                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                      <Button
                        className="ml-3 items-center px-4 py-2 font-semibold text-xs uppercase tracking-widest bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white hover:from-pink-500 hover:to-violet-500 disabled:opacity-25 transition ease-in-out duration-150"
                        disabled={!canSubmit}
                      >
                        {isSubmitting ? (
                          <p>
                            <LoaderCircle size={20} className="animate-spin" />{" "}
                            Create
                          </p>
                        ) : (
                          "Create"
                        )}
                      </Button>
                    )}
                  />
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

export default FormInput;
