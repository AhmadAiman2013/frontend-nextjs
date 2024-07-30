'use client'

import clsx from "clsx";
import ApplicationLogo from "../ApplicationLogo";
import { ModeToggle } from "../theme-toogle";
import HeaderUser from "../HeaderUser";
import HeaderMain from "../HeaderMain";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";


interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { user } = useAuth({})


  return (
    <div
      className={clsx(
        "flex h-[60px] w-full  justify-between items-center sm:items-end mx-auto py-1 mt-6",
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
        { user ? <HeaderMain user={user}/> : <HeaderUser />}

        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
