import { TaskType } from "@/types/Task";
import TaskOption from "./TaskOption";

interface TaskItemProps {
  boardId: string;
  task: TaskType;
}

const TaskItem = ({ task, boardId }: TaskItemProps) => {
  return (
    <div className="flex items-center relative group mb-2 mx-1 truncate border-2 border-transparent hover:border-blue-primary py-2 px-2 text-sm bg-white dark:bg-[#333366] dark:text-[#CCCCFF] rounded-md shadow-sm">
      <div className="group-hover:opacity-40 transition-opacity duration-200">
        {task.title}
      </div>
      <div className="absolute right-0 bg-white dark:bg-[#333366] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-1">
        <TaskOption task={task} boardId={boardId}/>
      </div>
    </div>
  );
};

export default TaskItem;
