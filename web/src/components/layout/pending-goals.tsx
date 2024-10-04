import { CreateGoalCompletion } from '@/actions/http/create-goal-completion'
import { OutlineButton } from '@/components/ui/outline-button'
import { usePendingGoals } from '@/hooks/use-pending-goals'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data } = usePendingGoals()

  if (!data) return null

  const handleCompleteGoal = (goalId: string) => {
    CreateGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
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
