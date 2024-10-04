'use client'

import CreateGoal from '@/components/layout/create-goal'
import EmptyGoals from '@/components/layout/empty-goals'
import Loader from '@/components/layout/loader'
import Summary from '@/components/layout/summary'
import Unauthenticated from '@/components/layout/unauthenticated'
import { Dialog } from '@/components/ui/dialog'
import { useSummary } from '@/hooks/use-summary'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { status } = useSession()

  const { data, isLoading } = useSummary()

  if (status === 'unauthenticated') return <Unauthenticated />

  return (
    <Dialog>
      <Loader isLoading={isLoading || status === 'loading'}>
        {data && data?.total > 0 ? <Summary /> : <EmptyGoals />}
        <CreateGoal />
      </Loader>
    </Dialog>
  )
}
