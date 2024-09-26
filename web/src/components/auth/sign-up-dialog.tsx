'use client'

import { signUp } from '@/actions/auth/sign-up'
import CredentialsForm from '@/components/auth/credentials-form'
import GithubIcon from '@/components/icons/github-icon'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { AuthSchema } from '@/schemas/auth-schema'
import { X } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState, useTransition } from 'react'
import type { z } from 'zod'

export default function SignUpDialog() {
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [isPending, startTransition] = useTransition()

  const handleCreateAccount = ({
    email,
    password,
  }: z.infer<typeof AuthSchema>) => {
    startTransition(async () => {
      setSuccess(null)
      setError(null)

      const response = await signUp({ email, password })

      if (response.success) setSuccess(response.success)
      if (response.error) setError(response.error)
    })
  }

  const handleLogin = async () => {
    await signIn('github')
  }

  return (
    <DialogContent className="fixed space-y-6 h-min left-[50%] border-zinc-900 top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
      <header className="flex justify-between">
        <DialogTitle>Login</DialogTitle>
        <DialogClose>
          <X className="size-5 text-zinc-600" />
        </DialogClose>
      </header>

      <CredentialsForm
        success={success}
        error={error}
        disabled={isPending}
        onSubmit={handleCreateAccount}
      />

      <form action={handleLogin}>
        <Button type="submit" variant="secondary" className="w-full">
          <GithubIcon className="size-6" />
          Login with GitHub
        </Button>
      </form>
    </DialogContent>
  )
}
