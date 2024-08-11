

import { LoaderCircle, MoveUpRight } from "lucide-react";
import Link from "next/link";
import BoardOption from "./BoardOption";
import BoardInputForm from "./BoardInput";

interface BoardsCardProps {
  id: string;
  title: string;
  pathname: string;
  editing?: boolean;
}

const BoardsCard = ({ id, title, pathname, editing }: BoardsCardProps) => {
  return (
    <div className="flex group relative bg-background w-full h-[100px] rounded-lg border border-blue-900 dark:border-blue-primary p-2 shadow-lg shadow-blue-900/40 dark:shadow-md dark:shadow-blue-primary/40 overflow-hidden transition-all duration-300 ease-out hover:scale-110 hover:text-white hover:bg-blue-primary">
      {editing ? (
        <BoardInputForm initialValues={{ title }} mode="update" id={id} pathname={pathname}/>
      ) : (
        <>
          <Link href={`/dashboard/${id}`} className="flex-grow">
            <div className="overflow-hidden w-full h-full">{title}</div>
          </Link>
          <BoardOption id={id}  pathname={pathname} classname="opacity-5 group-hover:opacity-100"/>
        </>
      )}
      <MoveUpRight
        className="absolute bottom-0 right-0 mr-2 mb-2 opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out"
        size={20}
      />
    </div>
  );
};

export default BoardsCard;
