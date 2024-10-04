import { getPendingGoals } from '@/lib/http/get-pending-goals'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export function usePendingGoals() {
  const { data: session } = useSession()

  const query = useQuery({
    queryKey: ['pending-goals'],
    queryFn: () => getPendingGoals({ userId: session?.user?.id! }),
    enabled: !!session?.user?.id,
    staleTime: 60 * 1000, // 60 seconds
  })

  return query
}
