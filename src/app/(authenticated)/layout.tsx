'use client'
import { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Navigation from '@/components/Layouts/Navigation'
import Header from '@/components/Layouts/Header'

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth({ middleware: 'auth', redirectIfNotAuthenticated: '/login' })

  if (!user) {
    return null
  }

  return (
    <div className='w-full max-w-[1000px] mx-auto'>
      <Header className='max-w-[1000px]' user={user} />
      <main>{children}</main>
    </div>
  )
}

export default AppLayout