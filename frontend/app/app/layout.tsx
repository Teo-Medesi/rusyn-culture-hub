"use client";
import '@/app/globals.css'
import { DesktopNavbar, MobileNavbar } from "@/components"
import Footer from '@/components/Footer';
import { UserProvider } from '@/context/UserContext'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <main>
        <MobileNavbar className='md:hidden h-[10vh]' />
        {/* MobileNavbar is fixed so this empty div is used for filling up that missing space */}
        <div className='h-[10vh] md:hidden'></div>
        
        <DesktopNavbar className='hidden md:flex h-[10vh]' />
        
        <div className='h-[90vh]'>{children}</div>
      </main>
    </UserProvider>
  )
}
