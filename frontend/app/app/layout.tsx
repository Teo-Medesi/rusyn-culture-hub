"use client";
import '@/app/globals.css'
import { DesktopNavbar, MobileNavbar } from "@/components"
import { UserProvider } from '@/context/UserContext'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <main>
        <MobileNavbar className='md:hidden' />
        <DesktopNavbar className='hidden md:flex h-[10vh]' />
        <div className='h-[90vh]'>{children}</div>
      </main>
    </UserProvider>
  )
}
