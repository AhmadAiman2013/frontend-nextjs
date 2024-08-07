"use client";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Layouts/Header";

import { Toaster } from "@/components/ui/toaster";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth({
    middleware: "auth",
    redirectIfNotAuthenticated: "/login",
  });

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="w-full max-w-[990px] mx-auto">
        <Header />
        {children}
      </div>
      <Toaster />
    </>
  );
};

export default AppLayout;
