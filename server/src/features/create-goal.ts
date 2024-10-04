import { db } from '../db'
import { goals } from '../db/schema'

type CreateGoalRequest = Pick<
  typeof goals.$inferInsert,
  'title' | 'desiredWeeklyFrequency' | "userId"
>

export async function createGoal({
  title,
  desiredWeeklyFrequency,
  userId,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
      userId,
    })
    .returning()

  const goal = result[0]

  return { goal }
}
