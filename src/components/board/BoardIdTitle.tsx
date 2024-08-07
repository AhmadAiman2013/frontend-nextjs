import { BoardType } from "@/types/Board";
import BoardNavItem from "./BoardNavItem";
import BoardOption from "./BoardOption";
import BoardInputForm from "./BoardInput";

interface BoardIdTitleProps {
  id: string;
  board: BoardType;
  editing: boolean;
}

const BoardIdTitle = ({ board, id, editing }: BoardIdTitleProps) => {
  return (
    <>
      {editing ? (
        <div className="w-[200px]">
          <BoardInputForm
            initialValues={{ title: board.title }}
            mode="update"
            id={id}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <BoardNavItem title={board.title} currentId={id}/>
          <BoardOption id={id} />
        </div>
      )}
    </>
  );
};

export default BoardIdTitle;
