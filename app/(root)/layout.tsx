import Image from 'next/image'
import Link from 'next/link'
import  { ReactNode } from 'react'

const Rootlayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='root-layout'>
      <nav>
        <Link href="/" className="flex items-center gap-2">
           <Image src="/logo.svg" alt='Logo' width={38}
           height={32} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
           <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-primary-100">
             Vakta.AI
           </h2>         
        </Link>
      </nav>

      {children}
    </div>
  )
}

export default Rootlayout