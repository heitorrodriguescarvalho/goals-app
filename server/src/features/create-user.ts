import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'

interface createUserType {
  email: string
  password?: string
}

export async function createUser({ email, password }: createUserType) {
  const hasUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (hasUser) return { error: 'User already exists' }

  const result = await db
    .insert(users)
    .values({
      email,
      password,
    })
    .returning()

  return {
    user: result[0],
  }
}
