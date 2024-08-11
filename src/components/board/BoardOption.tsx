import { EllipsisVertical, SquarePen, Trash } from "lucide-react";
import { Button } from "../ui/button";
import BoardsPopover from "./BoardsPopover";
import { useBoard } from "@/hooks/useBoard";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface BoardOptionProps {
  id: string;
  classname?: string;
  pathname: string;
}

const BoardOption = ({ id, classname, pathname }: BoardOptionProps) => {
  const { deleteBoard, isPendingDelete, isPendingUpdate, startEditing } = useBoard({ id });
  const { toast } = useToast();
  const router = useRouter();

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
    router.push("/dashboard");
  };

  const handleEdit = () => {
    startEditing({pageRoute: pathname, id: id})
  }
  return (
    <BoardsPopover
      triggerElement={
        <Button
          size="supericon"
          variant="ghost"
          className={clsx(classname)}
        >
          <EllipsisVertical size={20} />
        </Button>
      }
      popoverContent={
        <div>
          <div>
            <Button variant="ghost" size="icon" onClick={handleEdit} disabled={isPendingUpdate}>
                <SquarePen size={20} />
            </Button>
          </div>
          <div>
            <Button variant="ghost" size="icon" onClick={handleDelete} disabled={isPendingDelete} >
              <Trash size={20} />
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default BoardOption;
