'use server'

import { auth } from '@/auth'

export async function deleteGoalCompletion(completionId: string) {
  const session = await auth()

  if (!session?.user?.id) throw new Error('Unauthorized')

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-completion`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      completionId,
      userId: session.user.id,
    }),
  })
}
