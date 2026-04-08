import { ReactNode } from "react";
import LogoutButton from '@/components/LogoutButton'
import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileDropdown from "@/components/profileDropdown";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Footer from "@/components/Footer";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect('/sign-in');

  const user = await getCurrentUser();

  return (
    <div className='root-layout'>
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={38}
            height={32}
          />
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-primary-100">
            Vakta.AI
          </h2>
        </Link>

        <ProfileDropdown userName={user?.name || "User"} />
      </nav>

      {children}
      <Footer />
    </div>
  )
}

export default RootLayout