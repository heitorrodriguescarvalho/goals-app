'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthSchema } from '@/schemas/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight, Check, Loader2, ShieldAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

interface CredentialsFormProps {
  success: string | null
  error: string | null
  disabled: boolean
  onSubmit: ({ email, password }: z.infer<typeof AuthSchema>) => void
}

export default function CredentialsForm({
  success,
  error,
  disabled,
  onSubmit,
}: CredentialsFormProps) {
  const { register, formState, handleSubmit } = useForm<
    z.infer<typeof AuthSchema>
  >({
    resolver: zodResolver(AuthSchema),
  })
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          disabled={disabled}
          id="email"
          className="w-full"
          type="email"
          autoFocus
          {...register('email')}
        />
        {formState.errors.email && (
          <p className="text-red-400 text-sm">
            {formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          disabled={disabled}
          id="password"
          className="w-full"
          type="password"
          {...register('password')}
        />
        {formState.errors.password && (
          <p className="text-red-400 text-sm">
            {formState.errors.password.message}
          </p>
        )}
      </div>
      {success && (
        <Alert variant="success">
          <Check className="size-4" />
          <AlertTitle>Tudo certo!</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive">
          <ShieldAlert className="size-4" />
          <AlertTitle>Houve um problema!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button
        disabled={disabled}
        className="w-full font-semibold flex items-center"
        type="submit"
      >
        {disabled ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            Criar conta
            <ArrowUpRight className="size-5" />
          </>
        )}
      </Button>
    </form>
  )
}
