import { BulkDeleteGoals } from '@/actions/http/bulk-delete-goals'
import { CreateGoalCompletion } from '@/actions/http/create-goal-completion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { OutlineButton } from '@/components/ui/outline-button'
import { usePendingGoals } from '@/hooks/use-pending-goals'
import { useQueryClient } from '@tanstack/react-query'
import { PenLine, Plus, Trash, X } from 'lucide-react'
import { useState, useTransition } from 'react'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const [editMode, setEditMode] = useState(false)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const [isPending, startTransition] = useTransition()

  const { data } = usePendingGoals()

  if (!data) return null

  const handleCompleteGoal = (goalId: string) => {
    CreateGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  const handleToggleEditMode = () => setEditMode((prev) => !prev)

  const handleSelectGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId))
      setSelectedGoals((prev) => prev.filter((el) => el !== goalId))
    else
      setSelectedGoals((prev) => [...prev, goalId])
  }

  const handleDeleteGoals = () => {
    startTransition(async () => {
      await BulkDeleteGoals(selectedGoals)

      setSelectedGoals([])
      setEditMode(false)

      queryClient.invalidateQueries({ queryKey: ['summary'] })
      queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex justify-between w-full">
        <h2 className="text-xl font-medium">{editMode ? "Editando..." : "Suas metas"}</h2>
        {editMode ? (
          <div className="flex gap-4">
            <Button size="sm" className="bg-red-400 hover:bg-red-500" onClick={handleToggleEditMode}>
              <X className="size-4" />
              Cancelar
            </Button>
            <Button size="sm" variant="secondary" disabled={selectedGoals.length <= 0 || isPending} onClick={handleDeleteGoals}>
              <Trash className="size-4" />
              Excluir {!!selectedGoals.length && `(${selectedGoals.length})`}
            </Button>
          </div>
        ) : (
          <Button variant="secondary" size="sm" onClick={handleToggleEditMode}>
            <PenLine className="size-4" />
            Editar
          </Button>
        )}
      </div>
      {data.map(goal => {
        const completed = goal.completionCount >= goal.desiredWeeklyFrequency

        return (
          <OutlineButton
            key={goal.id}
            disabled={!editMode && completed}
            onClick={() => editMode ? handleSelectGoal(goal.id) : handleCompleteGoal(goal.id)}
            >
            {editMode ? (
              <Checkbox checked={selectedGoals.includes(goal.id)} />
            ) : (
              <Plus className="size-4 text-zinc-600" />
            )}
            <span className="w-full truncate">
            {goal.title}
            </span>
          </OutlineButton>
        )
      })}
    </div>
  )
}
