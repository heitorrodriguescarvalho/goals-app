import { twMerge } from 'tailwind-merge'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge('animate-pulse rounded-full bg-zinc-700', className)}
      {...props}
    />
  )
}

export { Skeleton }
