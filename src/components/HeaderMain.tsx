import { UserType } from "@/types/User";
import { useAuth } from "@/hooks/useAuth";
import { TfiArrowCircleDown, TfiArrowCircleUp } from "react-icons/tfi";
import Link from "next/link";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LogOut } from "lucide-react";
import { useState } from "react";


const HeaderMain = ({ user }: { user: UserType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth({});

  return (
    <div className="flex gap-2 items-center">

      <div className=" hover:text-blue-primary dark:hover:text-blue-primary">
        <Link href="/dashboard">{user?.name}</Link>
      </div>
      <Popover onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            {isOpen ? (
              <TfiArrowCircleUp className="h-4 w-4" />
            ) : (
              <TfiArrowCircleDown className="h-4 w-4" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-15 p-1">
          <Button onClick={logout} variant="ghost">
            <LogOut className="mr-2 h-3 w-4" />
            <span>Log out</span>
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HeaderMain;
