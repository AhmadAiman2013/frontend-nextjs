"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { useForm } from "@tanstack/react-form";
import { LoginSchema } from "@/types/schema/UserSchema";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {SiGoogle} from 'react-icons/si'

import { useAuth } from "@/hooks/useAuth";
import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import { useEffect, useState } from "react";
import AuthSessionStatus from "@/components/AuthSessionStatus";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>("");
  const [error, setErrors] = useState<string>("");

  const { login, loginGoogle } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const submitGoogle = async () => {
    try {
      await loginGoogle()
    } catch (error: any) {
      console.log(error)
    } finally {
      setStatus('')
    }
  }

  useEffect(() => {
    const resetToken = searchParams.get("reset");
    setStatus(resetToken ? atob(resetToken) : "");
  }, [searchParams]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    validatorAdapter: valibotValidator(),
    onSubmit: async ({ value }) => {
      const response = await login(value);
      if (response?.error) {
        setErrors(response.error);
      }
    },
  });

  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current " />
        </Link>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field
            name="email"
            asyncDebounceMs={500}
            validators={{
              onChange: LoginSchema.entries.email,
              onChangeAsyncDebounceMs: 500,
            }}
            children={(field) => {
              return (
                <div>
                  <Label
                    htmlFor={field.name}
                    className="font-medium text-sm"
                  >
                    Email
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    type="email"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 w-full "
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <em className="text-xs text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  ) : null}
                </div>
              );
            }}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
        <div>
          <form.Field
            name="password"
            asyncDebounceMs={500}
            validators={{
              onChange: LoginSchema.entries.password,
              onChangeAsyncDebounceMs: 500,
            }}
            children={(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="font-medium text-sm "
                >
                  Password
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="password"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 w-full "
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em className="text-xs text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </em>
                ) : null}
              </div>
            )}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
        <div className="flex items-center justify-between">
          <form.Field
            name="remember"
            validators={{
              onChange: LoginSchema.entries.remember,
            }}
            children={(field) => (
              <div className="flex items-center space-x-2">
                <Checkbox  id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onCheckedChange={(checked) => field.setValue(checked as boolean)}/>
                <Label
                  htmlFor={field.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Remember me
                </Label>
              </div>
            )}
          />
        </div>
        <div className="flex items-center justify-end mt-4">
          <Link
            href="/forgot-password"
            className="underline text-sm hover:text-blue-primary dark:hover:text-blue-primary"
          >
            Forgot your password?
          </Link>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                className="ml-3 items-center px-4 py-2 font-semibold text-xs uppercase tracking-widest bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white hover:from-pink-500 hover:to-violet-500 disabled:opacity-25 transition ease-in-out duration-150"
                disabled={!canSubmit}
              >
                {isSubmitting ? "Login..." : "Login"}
              </Button>
            )}
          />
        </div>
      </form>
      <div className="mt-4">
        
        <Button
          onClick={submitGoogle}
          type="button"
          className="w-full text-white"
        >
          <SiGoogle className="w-4 h-4 inline-block mr-2" />
          Sign in with Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
          Doest not have an account?{" "}
          <Link href="/register" className="underline">
            Signup
          </Link>
        </div>
      <AuthSessionStatus status={status} />
    </AuthCard>
  );
};

export default LoginForm;
