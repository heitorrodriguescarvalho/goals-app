'use server'

import bcrypt from 'bcryptjs'
import { z } from 'zod'

type UserType = {
  id: string
  email: string
  password: string | null
  createdAt: Date
}

const createUserSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).optional(),
})

export async function createUser(
  credentials: z.infer<typeof createUserSchema>
) {
  console.log({ credentials })
  const { data, success } = createUserSchema.safeParse(credentials)

  if (!success)
    return { error: { statusCode: 400, message: 'Invalid credentials' } }

  const { email, password } = data

  const response = await fetch('http://localhost:3333/create-user', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password: password ? bcrypt.hashSync(password, 10) : undefined,
    }),
  })

  if (response.status === 409)
    return {
      error: { statusCode: response.status, message: 'User already exists' },
    }

  if (!response.ok)
    return {
      error: { statusCode: response.status, message: 'Something went wrong' },
    }

  const user: UserType = await response.json()

  return { user }
}
