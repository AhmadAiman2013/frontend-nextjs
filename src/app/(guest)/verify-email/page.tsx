"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";
import AuthCard from "@/components/AuthCard";
import ApplicationLogo from "@/components/ApplicationLogo";

const VerifyEmailPage = () => {
  const [status, setStatus] = useState<string>("");

  const { logout, resendEmailVerification } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/dashboard",
  });

  const onResend = async () => {
    const response = await resendEmailVerification();
    setStatus(response.data.message || "Unknown status");
  };

  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current" />
        </Link>
      }
    >
      <div className="mb-4 text-sm ">
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn&apos;t receive the email, we will gladly send you another.
      </div>

      {status === "verification-link-sent" ? (
        <div className="mb-4 font-medium text-sm ">
          Waiting for verification email
        </div>
      ) : (
        <div className="mb-4 font-medium text-sm text-green-600">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <Button
          className="items-center px-4 py-2 font-semibold text-xs uppercase tracking-widest bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white hover:from-pink-500 hover:to-violet-500 disabled:opacity-25 transition ease-in-out duration-150"
          onClick={onResend}
        >
          Resend Verification Email
        </Button>

        <button
          type="button"
          className="underline text-sm  hover:text-blue-primary dark:hover:text-blue-primary"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </AuthCard>
  );
};

export default VerifyEmailPage;
