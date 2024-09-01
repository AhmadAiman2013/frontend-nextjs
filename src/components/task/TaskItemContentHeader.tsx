import { TaskType } from "@/types/Task";
import { cn } from "@/lib/utils";
import { AlarmClock } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useTask } from "@/hooks/useTask";
import { useToast } from "../ui/use-toast";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useState } from "react";

interface TaskItemContentHeaderProps {
  dueDate: Date;
  task: TaskType;
  boardId: string;
}

const TaskItemContentHeader = ({
  dueDate,
  task,
  boardId,
}: TaskItemContentHeaderProps) => {
  const { updateTask } = useTask({ id: task.id, boardId });
  const [isChecked, setIsChecked] = useState(Boolean(task.completed));
  const { toast } = useToast();

  dayjs.extend(localizedFormat);

  const isOverdue = dueDate.getTime() < Date.now();

  const handleCheckboxChange = async (checked: boolean) => {
    setIsChecked(checked);
    const response = await updateTask({
      cardId: task.card_id,
      completed: checked,
    });
    if (response?.error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: response.error,
      });
      return;
    }
    if (checked === true) {
      toast({
        className: "bg-green-500",
        description: `Task ${task.title} completed`,
      });
      return;
    } else {
      toast({
        variant: "destructive",
        description: `Task ${task.title} not completed`,
      });
      return;
    }
  };

  return (
    <div
      className={cn(
        "flex justify-start items-center gap-2 mb-1",
        isOverdue ? "text-red-500" : "text-green-500"
      )}
    >
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleCheckboxChange}
        className={cn(
          isOverdue ? "border-red-500 data-[state=checked]:bg-red-500" : "border-green-500 data-[state=checked]:bg-green-500"
        )}
      />
      <AlarmClock size={15} />
      <div>{dayjs(dueDate).format("ll")}</div>
    </div>
  );
};

export default TaskItemContentHeader;