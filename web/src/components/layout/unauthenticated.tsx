import { login } from '@/actions/auth/login'
import GithubIcon from '@/components/icons/github-icon'
import Logo from '@/components/icons/logo'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Unauthenticated() {
  return (
    <div className="flex flex-1 flex-col items-center gap-8 py-8">
      <Logo />
      <Image
        src="/unauthenticated-illustration.svg"
        alt="Person using laptop illustration"
        height={320}
        width={320}
        priority
      />
      <p className="max-w-80 text-center text-zinc-300 leading-relaxed">
        Faça login com sua conta do GitHub e crie sua primeira meta!
      </p>

      <form action={login}>
        <Button>
          <GithubIcon className="mr-2 size-6" />
          Login com Github
        </Button>
      </form>
    </div>
  )
}
