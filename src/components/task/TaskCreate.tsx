import { CirclePlus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import TaskInput from "./TaskInput";
import { useState } from "react";

interface TaskCreateProps {
  cardId: string;
  boardId: string;
}

const TaskCreate = ({ cardId, boardId }: TaskCreateProps) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleCreateComplete = () => {
    setIsCreating(false);
  };

  return (
    <div className="mx-1">
      {isCreating ? (
        <div className="rounded-md bg-[#f1f2f4] dark:bg-[#000022]">
          <TaskInput
            initialValues={{ title: "" }}
            cardId={cardId}
            boardId={boardId}
            mode="create"
            onCreateComplete={handleCreateComplete}
          />
        </div>
      ) : (
        <Button
        variant="ghost"
          onClick={() => setIsCreating(true)}
          className="flex justify-center w-full transition duration-300"
        >
          <CirclePlus size={20} className="mr-2" />
        </Button>
      )}
    </div>
  );
};

export default TaskCreate;