'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import { valibotValidator } from '@tanstack/valibot-form-adapter'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAuth } from '@/hooks/useAuth'
import AuthCard from '@/components/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'
import { ResetPasswordScheme } from '@/types/schema/UserSchema'

const PasswordResetPage = () => {
  const query = useSearchParams()
  const [error, setErrors] = useState<string>("");
  const { resetPassword } = useAuth({ middleware: 'guest' })

  const form = useForm({
    defaultValues: {
      email: query.get('email') ?? '',
      password: "",
      password_confirmation: "",
    },
    validatorAdapter: valibotValidator(),
    onSubmit: async ({ value }) => {
        const response = await resetPassword(value);
        if (response?.error) {
          setErrors(response.error);
        }
    },
  });


  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current" />
        </Link>
      }>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4">
             <div>
          <form.Field
            name="email"
            asyncDebounceMs={500}
            validators={{
              onChange: ResetPasswordScheme.entries.email,
              onChangeAsyncDebounceMs: 500,
            }}
            children={(field) => {
              return (
                <div>
                  <Label
                    htmlFor={field.name}
                    className="block font-medium "
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
          {error && <em className="text-xs text-red-500 mt-1">{error}</em>}
        </div>
        <div>
          <form.Field
            name="password"
            asyncDebounceMs={500}
            validators={{
              onChange: ResetPasswordScheme.entries.password,
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
          {error && <em className="text-xs text-red-500 mt-1">{error}</em>}
        </div>
        <div>
          <form.Field
            name="password_confirmation"
            asyncDebounceMs={500}
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) => {
                try {
                  if (value !== fieldApi.form.getFieldValue("password")) {
                    return "Passwords do not match";
                  }
                } catch (error) {
                  console.error(error);
                }
              },
              onChangeAsyncDebounceMs: 500,
            }}
            children={(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="font-medium text-sm "
                >
                  Confirm password
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
          {error && <em className="text-xs text-red-500 mt-1">{error}</em>}
        </div>
        <div>
        <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                className="ml-3 items-center px-4 py-2 font-semibold text-xs uppercase tracking-widest bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white hover:from-pink-500 hover:to-violet-500 disabled:opacity-25 transition ease-in-out duration-150"
                disabled={!canSubmit}
              >
                {isSubmitting ? "Resetting..." : "Reset"}
              </Button>
            )}
          />
        </div>
        </form>
    </AuthCard>
  )
}

export default PasswordResetPage
