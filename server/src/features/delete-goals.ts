import { and, eq, inArray } from 'drizzle-orm'
import { db } from '../db'
import { goals } from '../db/schema'

interface DeleteGoalsType {
  userId: string
  goalIds: string[]
}

export async function deleteGoals({ userId, goalIds }: DeleteGoalsType) {
  const removedGoals = await db
    .delete(goals)
    .where(and(
      eq(goals.userId, userId),
      inArray(goals.id, goalIds)
    )).returning()

  return { goals: removedGoals }
}
