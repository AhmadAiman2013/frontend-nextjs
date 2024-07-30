import clsx from "clsx";
import ApplicationLogo from "../ApplicationLogo";
import { ModeToggle } from "../theme-toogle";
import { UserType } from "@/types/User";

import HeaderUser from "../HeaderUser";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HeaderMain from "../HeaderMain";


interface HeaderProps {
  className?: string;
  user?: UserType;
}

const Header = ({ className, user }: HeaderProps) => {
  const pathname = usePathname()

  const [open, setOpen] = useState<boolean>(false)

  return (
    <div
      className={clsx(
        "shrink-0 flex h-[60px] w-full  justify-between items-center sm:items-end mx-auto py-1 mt-6",
        className
      )}
    >
      <Link
        href="/"
        className="flex items-center bg-background dark:bg-background border rounded-lg px-3 py-1"
      >
        <ApplicationLogo height="38" width="40" />

        <h1 className="ml-2 font-bold">CORET</h1>
      </Link>
      <div className="flex gap-3 items-center">
        {pathname === '/dashboard' && user ? <HeaderMain user={user}/> : <HeaderUser />}

        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
