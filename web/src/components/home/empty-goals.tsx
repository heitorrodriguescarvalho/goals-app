import CreateGoal from '@/components/home/create-goal'
import Logo from '@/components/icons/logo'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import Image from 'next/image'

export default function EmptyGoals() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <Logo />
      <Image
        src="/lets-start-illustration.svg"
        alt="Let's start illustration"
        height={320}
        width={320}
      />
      <p className="max-w-80 text-center text-zinc-300 leading-relaxed">
        Você ainda não cadastrou nenhuma meta, que tal cadastar uma agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar Meta
        </Button>
      </DialogTrigger>

      <CreateGoal />
    </div>
  )
}
