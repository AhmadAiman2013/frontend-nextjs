import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectPortal,
} from "@/components/ui/select";
import { BoardType } from "@/types/Board";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface BoardNavItemProps {
  boards: BoardType[];
  currentBoard: BoardType;
}

const BoardNavItem = ({ boards, currentBoard }: BoardNavItemProps) => {
  const router = useRouter();
  

  const handleValueChange = (value: string) => {
    const board = boards.find((board) => board.title === value);
    if (board) {
      router.push(`/dashboard/${board.id}`);
    }
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[120px] overflow-hidden">
        <SelectValue placeholder={currentBoard?.title || ''} />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent >
          <SelectGroup>
            {boards
              .filter((board) => board.id !== currentBoard.id)
              .map((board) => {
                return (
                  <SelectItem value={board.title} key={board.id}>
                    {board.title}
                  </SelectItem>
                );
              })}
          </SelectGroup>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default BoardNavItem;
