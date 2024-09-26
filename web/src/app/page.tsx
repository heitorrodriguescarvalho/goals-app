'use client'

import { getSummary } from '@/actions/http/get-summary'
import CreateGoal from '@/components/home/create-goal'
import EmptyGoals from '@/components/home/empty-goals'
import Summary from '@/components/home/summary'
import { Dialog } from '@/components/ui/dialog'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  return (
    <Dialog>
      {data && data?.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}
