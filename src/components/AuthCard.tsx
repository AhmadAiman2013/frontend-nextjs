import React, { ReactNode } from 'react'

type Props = {
  logo: ReactNode
  children: ReactNode
}

const AuthCard = ({ logo, children }: Props) => {
  return (
    <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-background dark:bg-background my-auto">
      <div>{logo}</div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-background dark:bg-background text-foreground dark:text-foreground shadow-md dark:shadow-blue-primary/20 overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  )
}

export default AuthCard
