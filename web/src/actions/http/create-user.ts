'use server'

import { z } from 'zod'

type UserType = {
  id: string
  email: string
  image?: string
  createdAt: Date
}

const createUserSchema = z.object({
  email: z.string().email(),
  image: z.string().url().optional(),
})

export async function createUser(
  credentials: z.infer<typeof createUserSchema>
) {
  const { data, success } = createUserSchema.safeParse(credentials)

  if (!success)
    return { error: { statusCode: 400, message: 'Invalid credentials' } }

  const { email, image } = data

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/create-user`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        image,
      }),
    }
  )

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
