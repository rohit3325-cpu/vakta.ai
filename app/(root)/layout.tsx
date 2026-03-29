import LogoutButton from '@/components/LogoutButton'
import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import  { ReactNode } from 'react'

const Rootlayout = async({children}: {children: ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated) redirect('/sign-in');

  return (
    <div className='root-layout'>
      <nav className="flex items-center justify-between px-6 py-4">
  <Link href="/" className="flex items-center gap-2">
    <Image
      src="/logo.svg"
      alt="Logo"
      width={38}
      height={32}
      className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
    />
    <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-primary-100">
      Vakta.AI
    </h2>
  </Link>

  <LogoutButton />
</nav>

      {children}
    </div>
  )
}

export default Rootlayout