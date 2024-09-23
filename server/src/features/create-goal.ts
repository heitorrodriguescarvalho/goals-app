import { db } from '../db'
import { goals } from '../db/schema'

type CreateGoalRequest = Pick<
  typeof goals.$inferInsert,
  'title' | 'desiredWeeklyFrequency'
>

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return { goal }
}
