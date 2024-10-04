import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'

interface createUserType {
  email: string
  image?: string
}

export async function createUser({ email, image }: createUserType) {
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existingUser) return { error: 'User already exists' }

  const result = await db
    .insert(users)
    .values({
      email,
      image,
    })
    .returning()

  return {
    user: result[0],
  }
}
