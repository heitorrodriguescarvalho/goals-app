import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'

interface GetUserType {
  email: string
}

export async function getUser({ email }: GetUserType) {
  const result = await db
    .select({
      id: users.id,
      email: users.email,
      password: users.password,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  const user = result[0]

  if (!user) return { error: 'User not found' }

  return { user }
}
