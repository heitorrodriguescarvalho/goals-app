import dayjs from 'dayjs'
import { and, desc, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'

export async function getWeekSummary({ userId }: { userId: string }) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(and(lte(goals.createdAt, lastDayOfWeek), eq(goals.userId, userId)))
  )

  const goalsCompletedInWeek = db.$with('goal_completion_counts').as(
    db
      .select({
        id: goalCompletions.id,
        title: goals.title,
        completedAt: goalCompletions.createdAt,
        completedAtDate: sql`DATE(${goalCompletions.createdAt})`.as(
          'completed_at_date'
        ),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goalCompletions.userId, userId),
        )
      )
      .orderBy(desc(goalCompletions.createdAt))
  )

  const goalsCompletedByWeekDay = db.$with('goal_complted_by_week_day').as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql`JSON_AGG(JSON_BUILD_OBJECT(
      'id', ${goalsCompletedInWeek.id},
      'title', ${goalsCompletedInWeek.title},
      'completedAt', ${goalsCompletedInWeek.completedAt}))`.as('completions'),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
      .orderBy(desc(goalsCompletedInWeek.completedAtDate))
  )

  type GoalsPerDay = Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >

  const result = await db
    .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
    .select({
      completed: sql`(SELECT COUNT(*) FROM ${goalsCompletedInWeek})`.mapWith(
        Number
      ),
      total:
        sql`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
          Number
        ),
      goalsPerDay: sql<GoalsPerDay>`JSON_OBJECT_AGG(
        ${goalsCompletedByWeekDay.completedAtDate},
        ${goalsCompletedByWeekDay.completions}
      )`,
    })
    .from(goalsCompletedByWeekDay)

  return {
    summary: result[0],
  }
}
