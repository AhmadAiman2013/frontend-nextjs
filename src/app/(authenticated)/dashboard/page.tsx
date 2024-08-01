"use client";

import BoardsCard from "@/components/board/BoardsCard";
import { useBoard } from "@/hooks/useBoard";
import { Calendar, CircleCheckBig, Folder } from "lucide-react";

const DashboardPage = () => {
  const { boards } = useBoard({});

  return (
    <div className="pt-12 w-full max-w-[990px]">
      <p className="text-2xl font-semibold">What do you plan to do today?</p>
      <div>
        <section className="flex gap-2">
          <div className="basis-3/4 flex gap-2 items-center">
            <Calendar size={20} />
            <p>Calendar</p>
          </div>
          <div className="basis-1/4 flex gap-2 items-center">
            <CircleCheckBig size={20} />
            <p>Recent tasks</p>
          </div>
        </section>
        <section>
          <div className="flex gap-2 items-center">
            <Folder size={20} />
            <p>Boards</p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4 w-full max-w-[900px] mt-4">
            {boards?.data?.map((board) => {
              return <BoardsCard key={board.id} title={board.title} id={board.id}/>;
            })}
          </div>
  
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
