import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectPortal,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useBoard } from "@/hooks/useBoard";

interface BoardNavItemProps {
  title: string;
  currentId: string
}

const BoardNavItem = ({ title, currentId }: BoardNavItemProps) => {
  const { boards } = useBoard({});
  const router = useRouter();
  
  const handleValueChange = (value: string) => {
    const board = boards?.data?.find((board) => board.title === value);
    if (board) {
      router.push(`/dashboard/${board.id}`);
    } else {
      return ;
    }
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[120px] overflow-hidden">
        <SelectValue placeholder={title || ''} />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent >
          <SelectGroup>
            {boards?.data?.map((board) => {
                return (
                  <SelectItem value={board.title} key={board.id} disabled={board.id === currentId}>
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
