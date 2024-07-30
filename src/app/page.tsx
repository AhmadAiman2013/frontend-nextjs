"use client";

import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Layouts/Header";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth({ middleware: "guest" });

  return (
    <div className="sm:mx-auto flex flex-col w-full max-w-[990px]">
      <Header/>
      <div className="w-full px-0 h-[2px] border-transparent dark:bg-gradient-to-r from-background via-blue-primary to-background bg-clip-border"></div>
      <section className="w-full px-0 dark:bg-gradient-to-b from-blue-950 to-bg-background h-[100px]"></section>
      <section className="flex flex-col justify-center mx-auto items-center mt-2 gap-3 text-center">
        <p className="font-bold text-5xl text-blue-primary dark:text-blue-primary">
          The everything note,
        </p>
        <p className="font-bold text-5xl text-blue-primary dark:text-blue-primary">
          for everything
        </p>
        <p className="mt-4 text-md text-lg">
          Designed to streamline your note-taking
        </p>
        <p className="text-lg"> and boost your productivity.</p>
        <div className="flex items-center gap-1 border rounded-lg py-4 px-14 mt-4 bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white hover:from-pink-500 hover:to-violet-500 ">
          <div className="text-xl">
            <Link href="/register">Get started, it's FREE</Link>
          </div>
          <MoveRight size={20} />
        </div>
      </section>
    </div>
  );
}
