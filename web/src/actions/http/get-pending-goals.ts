'use server'

type PendingGoalsType = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}[]

export async function getPendingGoals(): Promise<PendingGoalsType> {
  const response = await fetch('http://localhost:3333/pending-goals')
  const data: { pendingGoals: PendingGoalsType } = await response.json()

  return data.pendingGoals
}
