import { EllipsisVertical, MoveUpRight } from "lucide-react";
import Link from "next/link";
import BoardOption from "./BoardOption";

interface BoardsCardProps {
  id: string;
  title: string;
}

const BoardsCard = ({ id, title }: BoardsCardProps) => {
  return (
    <Link href={`/dashboard/${id}`}>
      <div className="group relative bg-background w-full h-[100px] rounded-lg border border-blue-900 dark:border-blue-primary p-2 shadow-lg shadow-blue-900/40 dark:shadow-md dark:shadow-blue-primary/40 overflow-hidden transition-all duration-300 ease-out hover:scale-110 hover:text-white hover:bg-blue-primary">
        <div className="flex justify-between items-center">
          <p className="overflow-hidden">{title}</p>
          <BoardOption />
        </div>
        <MoveUpRight
          className="absolute bottom-0 right-0 mr-2 mb-2 opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out"
          size={20}
        />
      </div>
    </Link>
  );
};

export default BoardsCard;
