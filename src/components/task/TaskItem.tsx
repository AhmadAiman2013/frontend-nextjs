import { TaskType } from "@/types/Task";
import TaskOption from "./TaskOption";
import TaskInput from "./TaskInput";
import TaskItemContent from "./TaskItemContent";

interface TaskItemProps {
  boardId: string;
  task: TaskType;
  editing: boolean;
}

const TaskItem = ({ task, boardId, editing }: TaskItemProps) => {
  return (
    <div>
      {editing ? (
        <div className="mb-2">
          <TaskInput
            initialValues={{ title: task.title }}
            id={task.id}
            cardId={task.card_id}
            boardId={boardId}
            mode="update"
          />
        </div>
      ) : (
        <TaskItemContent task={task} boardId={boardId} />
      )}
    </div>
  );
};

export default TaskItem;
