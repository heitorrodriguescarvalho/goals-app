import LogoIcon from '@/components/icons/logo-icon'

export default function Logo() {
  return (
    <span className="flex items-center gap-3 text-lg leading-none backdrop-blur-sm rounded-full pr-2 bg-zinc-950/20">
      <LogoIcon className="size-10" />
      Goals App
    </span>
  )
}
