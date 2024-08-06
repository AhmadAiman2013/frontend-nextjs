import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BoardInput from "./BoardInput";

const BoardsPopover = ({ children }: { children: React.ReactNode }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-1">
        <BoardInput />
      </PopoverContent>
    </Popover>
  );
};

export default BoardsPopover;
