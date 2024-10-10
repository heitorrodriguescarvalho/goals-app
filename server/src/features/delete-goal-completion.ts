import { and, eq } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions } from '../db/schema'

interface DeleteCompletionType {
  userId: string
  completionId: string
}

export async function deleteGoalCompletion({ userId, completionId }: DeleteCompletionType) {
  const [goalCompletion] = await db
    .delete(goalCompletions)
    .where(and(
      eq(goalCompletions.userId, userId),
      eq(goalCompletions.id, completionId)
    )).returning()

  return { goalCompletion }
}
