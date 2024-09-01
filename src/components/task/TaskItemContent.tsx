import { TaskType } from "@/types/Task";
import TaskOption from "./TaskOption";
import TaskItemContentHeader from "./TaskItemContentHeader";
import { cn } from "@/lib/utils";

interface TaskItemContentProps {
  task: TaskType;
  boardId: string;
}

const TaskItemContent = ({ task, boardId }: TaskItemContentProps) => {
  const dueDate = task.due_date ? new Date(task.due_date) : null;

  return (
    <div className="flex items-center group mb-2 mx-1 relative border-2 border-transparent hover:border-blue-primary  py-2 px-2 text-sm bg-white dark:bg-[#333366] dark:text-[#CCCCFF] rounded-md shadow-sm">
      <div >
        {dueDate && (
          <TaskItemContentHeader task={task} boardId={boardId} dueDate={dueDate}/>
        )}
        <div className={cn(
          "group-hover:opacity-40  transition-opacity duration-200",
          task.completed && "line-through"
        )}>{task.title}</div>
      </div>
      <div className="absolute right-0 bg-white dark:bg-[#333366] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-1">
        <TaskOption task={task} boardId={boardId} />
      </div>
    </div>
  );
};

export default TaskItemContent;
