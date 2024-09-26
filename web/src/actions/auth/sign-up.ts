'use server'

import { createUser } from '@/actions/http/create-user'
import { getUser } from '@/actions/http/get-user'
import { AuthSchema } from '@/schemas/auth-schema'
import type { z } from 'zod'

export async function signUp(data: z.infer<typeof AuthSchema>) {
  const validatedFields = AuthSchema.safeParse(data)

  if (!validatedFields.success) return { error: 'Campos inválidos' }

  const { email, password } = validatedFields.data

  const existingUser = await getUser({ email })

  console.log({ existingUser })

  if (existingUser) return { error: 'Esse email já está em uso' }

  const { user, error } = await createUser({ email, password })

  if (error || !user) {
    return { error: 'Algo deu errado...' }
  }

  return { success: 'Usuário cadastrado' }
}
