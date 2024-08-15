import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import PopoverElement from "../PopoverElement";
import CardInput from "./CardInput";

const CardCreate = ( { boardId }: {boardId : string}) => {
  return (
    <PopoverElement
      triggerElement={
        <Button className="flex justify-start bg-gradient-to-r  from-blue-200 to-fuchsia-200 hover:from-blue-400 hover:to-fuchsia-400  text-blue-800 hover:text-blue-900 dark:text-white/90 dark:bg-gradient-to-r dark:from-blue-500/40 dark:to-fuchsia-500/40 dark:hover:text-white dark:hover:from-blue-500 dark:hover:to-fuchsia-500 transition duration-300 ease-out hover:scale-105">
          <Plus size={20} className="mr-2" />
          <p>Create a card!</p>
        </Button>
      }
      popoverContent={<CardInput initialValues={{ title: "" }} mode="create" boardId={boardId}/>}
    />
  );
};

export default CardCreate;
