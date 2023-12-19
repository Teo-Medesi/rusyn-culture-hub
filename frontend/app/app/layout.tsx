import '@/app/globals.css'
import { DesktopNavbar, MobileNavbar } from "@/components"
import { getUser } from '@/utils';


export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <main>
      <MobileNavbar className='md:hidden' />
      <DesktopNavbar user={user} className='hidden md:flex h-[10vh]' />
      <div className='h-[90vh]'>{children}</div>
    </main>
  )
}
