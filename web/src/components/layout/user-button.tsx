'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { LogOut, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

export default function LogoutButton() {
  const { data: session } = useSession()

  const isPending = !session?.user

  const image = isPending ? undefined : session?.user?.image || undefined

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isPending}
          variant="ghost"
          className="flex size-10 items-center gap-4 rounded-full bg-transparent lg:size-auto lg:w-64 lg:rounded-lg"
        >
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback className="flex items-center justify-center">
              {isPending ? (
                <Skeleton className="size-10" />
              ) : (
                <User className="size-5" />
              )}
            </AvatarFallback>
          </Avatar>
          {isPending ? (
            <Skeleton className="h-4 flex-1" />
          ) : (
            <p className="hidden flex-1 truncate lg:block">
              {session?.user?.email}
            </p>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-zinc-950 lg:w-64">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer py-2.5 hover:bg-zinc-900"
          >
            <LogOut className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
