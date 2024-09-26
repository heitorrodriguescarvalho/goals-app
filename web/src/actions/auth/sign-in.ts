import { getUser } from '@/actions/http/get-user'
import { signIn as authSignIn } from '@/lib/auth'
import { AuthSchema } from '@/schemas/auth-schema'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import type { z } from 'zod'

export async function signIn(data: z.infer<typeof AuthSchema>) {
  const validatedFields = AuthSchema.safeParse(data)

  if (!validatedFields.success) return { error: 'Campos inválidos' }

  const { email, password } = validatedFields.data

  const existingUser = await getUser({ email })

  if (!existingUser) return { error: 'Usuário inexistente. Crie uma conta!' }

  if (!existingUser.password) return { error: 'Faça login com GitHub' }

  const matchPassword = bcrypt.compareSync(password, existingUser.password)

  if (!matchPassword) return { error: 'Email ou senha incorreta' }

  try {
    await authSignIn('credentials', { email, password })

    return { success: 'Você entrou' }
  } catch (error) {
    if (error instanceof AuthError && error.type === 'CredentialsSignin')
      return { error: 'Email ou senha incorreta' }

    return { error: 'Algo de errado...' }
  }
}
