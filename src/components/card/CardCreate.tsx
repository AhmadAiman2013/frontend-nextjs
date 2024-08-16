import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import CardInput from "./CardInput";
import { useState } from "react";
interface CardCreateProps {
  boardId: string;
}

const CardCreate = ({ boardId }: CardCreateProps) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleCreateComplete = () => {
    setIsCreating(false);
  };

  return (
    <div>
      {isCreating ? (
        <div className="rounded-md bg-[#f1f2f4] dark:bg-[#000022] shadow-lg shadow-blue-900/40 dark:shadow-md dark:shadow-blue-primary/40">
          <CardInput
            initialValues={{ title: "" }}
            mode="create"
            boardId={boardId}
            onCreateComplete={handleCreateComplete}
          />
        </div>
      ) : (
        <Button
          onClick={() => setIsCreating(true)}
          className="flex justify-start bg-gradient-to-r  from-blue-200 to-fuchsia-200 hover:from-blue-400 hover:to-fuchsia-400  text-blue-800 hover:text-blue-900 dark:text-white/90 dark:bg-gradient-to-r dark:from-blue-500/40 dark:to-fuchsia-500/40 dark:hover:text-white dark:hover:from-blue-500 dark:hover:to-fuchsia-500 transition duration-300 ease-out hover:scale-105"
        >
          <Plus size={20} className="mr-2" />
          <p>Create a card!</p>
        </Button>
      )}
    </div>
  );
};

export default CardCreate;
