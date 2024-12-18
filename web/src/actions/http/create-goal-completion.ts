'use server'

import { auth } from '@/auth'

export async function CreateGoalCompletion(goalId: string) {
  const session = await auth()

  if (!session?.user?.id) throw new Error('Unauthorized')

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/completions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
      userId: session.user.id,
    }),
  })
}
