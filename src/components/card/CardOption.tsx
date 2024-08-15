import { EllipsisVertical, SquarePen, Trash } from "lucide-react";
import { Button } from "../ui/button";
import PopoverElement from "../PopoverElement";
import { useCard } from "@/hooks/useCard";
import { useToast } from "../ui/use-toast";
import clsx from "clsx";

interface CardOptionProps {
  id: string;
  classname?: string;
  boardId: string;
}

const CardOption = ({ id, boardId, classname }: CardOptionProps) => {
  const { deleteCard, isPendingDelete, isPendingUpdate, startEditingCard } =
    useCard({ id });
  const { toast } = useToast();

  const handleDelete = async () => {
    const response = await deleteCard({ boardId });
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
      description: "Card deleted",
    });
  };

  const handleEdit = () => {
    startEditingCard({ id: id });
  };

  return (
    <PopoverElement
      triggerElement={
        <Button size="supericon" variant="ghost" className={clsx(classname)}>
          <EllipsisVertical size={20} />
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
};

export default CardOption;
