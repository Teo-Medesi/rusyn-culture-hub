import '@/app/globals.css'
import { DesktopNavbar, MobileNavbar } from "@/components"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MobileNavbar className='md:hidden' />
        <DesktopNavbar className='hidden md:flex h-[10vh]' />
        <div className='h-[90vh]'>{children}</div>
      </body>
    </html>
  )
}
