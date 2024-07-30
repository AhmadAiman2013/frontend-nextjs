import { UserType } from "@/types/User";
import { useAuth } from "@/hooks/useAuth";
import { TfiArrowCircleDown } from "react-icons/tfi";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const HeaderMain = ({ user }: { user: UserType }) => {
  const { logout } = useAuth({});

  return (
    <div className="flex gap-3 items-center">
      <div>
        <Link href="/dashboard">{user?.name}</Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <TfiArrowCircleDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Button onClick={logout} variant="ghost">
            <LogOut className="mr-2 h-3 w-4" />
            <span>Log out</span>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderMain;
