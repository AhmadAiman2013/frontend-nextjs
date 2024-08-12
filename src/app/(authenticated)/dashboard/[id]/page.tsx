"use client";

import BoardIdTitle from "@/components/board/BoardIdTitle";
import CardItem from "@/components/card/CardItem";
import { Skeleton } from "@/components/ui/skeleton";
import { useBoard } from "@/hooks/useBoard";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";

const BoardsPage = () => {
  const { id } = useParams();
  const pathname = usePathname();
  const { board, isLoadingBoard, isEditing } = useBoard({
    id: id as string,
    pathname,
  });
  return (
    <div className="flex flex-col space-y-3 pt-12 mb-8 w-full max-w-[990px]">
      <div>
        {isLoadingBoard && <Skeleton className="w-[120px] h-[40px]" />}
        {board?.data && (
          <BoardIdTitle
            board={board.data}
            id={id as string}
            pathname={pathname}
            editing={isEditing({
              pageRoute: pathname as string,
              id: id as string,
            })}
          />
        )}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {isLoadingBoard && <Skeleton className="w-[120px] h-[40px]" />}
        {board?.data?.cards?.map((card, key) => {
          return <CardItem key={key} card={card} />;
        })}
        <div>create some task!</div>
      </div>
    </div>
  );
};

export default BoardsPage;
