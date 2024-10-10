'use server'

import { auth } from '@/auth'

export async function BulkDeleteGoals(goalIds: string[]) {
  const session = await auth()

  if (!session?.user?.id) throw new Error('Unauthorized')

  if (goalIds.length <= 0) return

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-goals`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      goalIds,
      userId: session.user.id,
    }),
  })
}
