import './globals.css'
import { DesktopNavbar, MobileNavbar } from "@/components"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MobileNavbar className='md:hidden' />
        <DesktopNavbar className='hidden md:block' />
        {children}
      </body>
    </html>
  )
}
