"use client";

import BoardsCard from "@/components/BoardsCard";
import { Calendar, CircleCheckBig, Folder } from "lucide-react";

const DashboardPage = () => {
const dummy = [
    {
      id: 1,
      title: "Folder 1",
    },
    {
      id: 2,
      title: "Folder 2",
    },
    {
      id: 3,
      title: "Folder 3",
    },
    {
      id: 4,
      title: "Folder 4",
    },
    {
      id: 5,
      title: "Folder 5",
    },
    {
      id: 6,
      title: "Folder 6",
    },
    {
      id: 7,
      title: "Folder 7",
    },
    {
      id: 8,
      title: "Folder 8",
    },
]

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
          <div className="grid grid-cols-4 md:grid-cols-5 gap-y-4 w-full mt-4">
            {dummy.map((item, key) => {
              return <BoardsCard key={key} title={item.title} />;
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
