import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { CreateGoalCompletion } from '../http/create-goal-completion'
import { getPendingGoals } from '../http/get-pending-goals'
import { OutlineButton } from './ui/outline-button'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
  })

  if (!data) return null

  const handleCompleteGoal = (goalId: string) => {
    CreateGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {data.map(goal => {
        const completed = goal.completionCount >= goal.desiredWeeklyFrequency

        return (
          <OutlineButton
            key={goal.id}
            disabled={completed}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
