'use client'

import Logo from '@/components/icons/logo'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center gap-8 py-8">
      <Logo />
      <Image
        src="/loading-illustration.svg"
        alt="Loading illustration"
        height={320}
        width={320}
        priority
      />
      <p className="max-w-80 text-center text-zinc-300 leading-relaxed">
        Aguarde um momento...
      </p>
    </div>
  )
}
