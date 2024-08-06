import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import BoardsPopover from "./BoardsPopover";
import { useBoard } from "@/hooks/useBoard";
import { useToast } from "../ui/use-toast";

const BoardOption = ({ id }: { id: string }) => {
  const { deleteBoard, isPendingDelete } = useBoard({ id });
  const { toast } = useToast();

  const handleDelete = async () => {
    const response = await deleteBoard();
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
      description: "Board deleted",
    });
  };
  return (
    <BoardsPopover
      triggerElement={
        <Button
          size="supericon"
          variant="ghost"
          className="opacity-5 group-hover:opacity-100"
        >
          <EllipsisVertical size={20} />
        </Button>
      }
      popoverContent={
        <div>
          <div>
            <Button variant="ghost">Edit</Button>
          </div>
          <div>
            <Button variant="ghost" onClick={handleDelete} disabled={isPendingDelete}>
              Delete
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default BoardOption;
