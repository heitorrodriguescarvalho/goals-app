import Logo from '@/components/icons/logo'
import CreateGoal from '@/components/layout/create-goal'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import Image from 'next/image'

export default function EmptyGoals() {
  return (
    <div className="flex flex-1 flex-col items-center gap-8 py-8">
      <Logo />
      <Image
        src="/lets-start-illustration.svg"
        alt="Let's start illustration"
        height={320}
        width={320}
        priority
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
