import { getSummary } from '@/lib/http/get-summary'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export function useSummary() {
  const { data: session } = useSession()

  const query = useQuery({
    queryKey: ['summary'],
    queryFn: () => getSummary({ userId: session?.user?.id! }),
    enabled: !!session?.user?.id,
    staleTime: 1000 * 60, // 60 seconds
  })

  return query
}
