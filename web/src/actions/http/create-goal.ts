'use server'

import { auth } from '@/auth'

interface CreateGoalType {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalType) {
  const session = await auth()

  if (!session?.user?.id) throw new Error('Unauthorized')

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
      userId: session.user.id,
    }),
  })
}
