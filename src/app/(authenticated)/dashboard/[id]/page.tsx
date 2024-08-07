"use client";

import BoardNavItem from "@/components/board/BoardNavItem";
import BoardOption from "@/components/board/BoardOption";
import { useBoard } from "@/hooks/useBoard";
import { useParams } from "next/navigation";

const BoardsPage = () => {
  const { id } = useParams();
  const { board, boards } = useBoard({ id: id as string });
  return (
    <div className="flex flex-col space-y-3 pt-12 mb-8 w-full max-w-[990px]">
      <div className="flex items-center gap-2">
        {board?.data && boards?.data && (
          <BoardNavItem boards={boards?.data} currentBoard={board?.data} />
        )}
        <BoardOption id={id as string} />
      </div>
      {board?.data?.cards?.map((card, key) => {
        return (
          <div className="m-3" key={key}>
            {card.title}
            {card.tasks?.map((task, key) => {
              return (
                <ul key={key}>
                  <li>{task.title}</li>
                  <li>Completed: {task.completed}</li>
                </ul>
              );
            })}
          </div>
        );
      })}
      <div>create some task!</div>
    </div>
  );
};

export default BoardsPage;
