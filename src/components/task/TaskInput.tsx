import { useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { TaskDataSchema } from "@/types/schema/TaskSchema";
import { useTask } from "@/hooks/useTask";
import { ElementRef, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { useOnClickOutside } from "usehooks-ts";

interface FormValues {
  title: string;
}
interface TaskInputFormProps {
  initialValues: FormValues;
  id?: string;
  cardId: string;
  boardId: string;
  onCreateComplete?: () => void;
}

const TaskInput = ({
  initialValues,
  id,
  cardId,
  boardId,
  onCreateComplete,
} : TaskInputFormProps) => {
  const [error, setErrors] = useState<string>("");
  const { createTask, isPendingCreate, updateTask, isPendingUpdate } = useTask({
    id,
    boardId
  });
  const { toast } = useToast();
  const formRef = useRef<ElementRef<"form">>(null);

  const form = useForm({
    defaultValues: initialValues,
    validatorAdapter: valibotValidator(),
    onSubmit: async ({ value }) => {
      let response;
      let newValue = {...value, cardId}
        if (onCreateComplete) {
          onCreateComplete();
        }
        response = await createTask(newValue);
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
          description: `"${response.data?.title}" task created`,
        });
        form.reset();
      }
  });

  const handleClickOutside = () => {
    const isPristine = form.state.isPristine
    const isDirty = form.state.isDirty
    const isValid = form.state.isValid

    if (isPristine) {
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
  
  return (
    <div>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        // className="pb-2"
      >
        <form.Field
          name="title"
          asyncDebounceMs={500}
          validators={{
            onChange: TaskDataSchema.entries.title,
            onChangeAsyncDebounceMs: 500,
          }}
          children={(field) => {
            return (
              <div 
              // className="space-y-2 mx-1"
              >
                <Label
                  htmlFor={field.name}
                  className="font-medium text-sm "
                ></Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isPendingUpdate || isPendingCreate}
                    className="w-full"
                  />
                
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
  )
}

export default TaskInput