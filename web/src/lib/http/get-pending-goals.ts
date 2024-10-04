type PendingGoalsType = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}[]

export async function getPendingGoals({
  userId,
}: { userId: string }): Promise<PendingGoalsType> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pending-goals/${userId}`
  )
  const data: { pendingGoals: PendingGoalsType } = await response.json()

  return data.pendingGoals
}
