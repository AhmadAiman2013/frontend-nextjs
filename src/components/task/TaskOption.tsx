import { Button } from "../ui/button";
import PopoverElement from "../PopoverElement";
import { useTask } from "@/hooks/useTask";
import { useToast } from "../ui/use-toast";
import { Pencil, SquarePen, Trash } from "lucide-react";
import { TaskType } from "@/types/Task";


type TaskOptionProps = {
    task: TaskType;
};

const TaskOption = ({
    task
} : TaskOptionProps) => {
    const { deleteTask, isPendingDelete, isPendingUpdate, startEditingTask } = useTask({ id: task.id });
    const { toast } = useToast();

    const handleDelete = async () => {
        const response = await deleteTask({cardId: task.card_id});
        if (response?.error) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: response.error,
            });
            return;
        }
        toast({
            className: "bg-green-500",
            description: "Task deleted",
        });
    };

    const handleEdit = () => {
        startEditingTask({ id: task.id });
    };

    return (
        <PopoverElement
            triggerElement={
                <Button size="supericon" variant="ghost" className="bg-white dark:bg-[#333366] font-extrabold" >
                    <Pencil size={20} />
                </Button>
            }
            popoverContent={
                <div>
                    <div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleEdit}
                            disabled={isPendingUpdate}
                        >
                            <SquarePen size={20} />
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDelete}
                            disabled={isPendingDelete}
                        >
                            <Trash size={20} />
                        </Button>
                    </div>
                </div>
            }
        />
    );
}

export default TaskOption