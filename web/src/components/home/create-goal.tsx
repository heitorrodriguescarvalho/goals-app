import { createGoal } from '@/actions/http/create-goal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog'

const createGoalSchema = z.object({
  title: z.string().min(1, 'Informe uma atividade'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

export default function CreateGoal() {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, formState, reset } = useForm<
    z.infer<typeof createGoalSchema>
  >({
    resolver: zodResolver(createGoalSchema),
  })

  async function handleCreateGoal({
    title,
    desiredWeeklyFrequency,
  }: z.infer<typeof createGoalSchema>) {
    await createGoal({ title, desiredWeeklyFrequency })

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

    reset()
  }

  return (
    <DialogContent>
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar Meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-1 flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register('title')}
              />
              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vezes na semana?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={`${field.value}`}
                    defaultValue="1"
                  >
                    <RadioGroupItem value="1">
                      <RadioGroupIndicator />
                      <span className="font-medium text-sm text-zinc-300 leading-none">
                        1x na semana
                      </span>
                      <span className="text-lg leading-none">🥱</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="2">
                      <RadioGroupIndicator />
                      <span className="font-medium text-sm text-zinc-300 leading-none">
                        2x na semana
                      </span>
                      <span className="text-lg leading-none">🙂</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="3">
                      <RadioGroupIndicator />
                      <span className="font-medium text-sm text-zinc-300 leading-none">
                        3x na semana
                      </span>
                      <span className="text-lg leading-none">😎</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="4">
                      <RadioGroupIndicator />
                      <span className="font-medium text-sm text-zinc-300 leading-none">
                        4x na semana
                      </span>
                      <span className="text-lg leading-none">😜</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="5">
                      <RadioGroupIndicator />
                      <span className="font-medium text-sm text-zinc-300 leading-none">
                        5x na semana
                      </span>
                      <span className="text-lg leading-none">🤨</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="6">
                      <RadioGroupIndicator />
                      <span className="font-medium text-sm text-zinc-300 leading-none">
                        6x na semana
                      </span>
                      <span className="text-lg leading-none">🤯</span>
                    </RadioGroupItem>
                    <RadioGroupItem value="7">
                      <RadioGroupIndicator />
                      <span className="font-medium text-sm text-zinc-300 leading-none">
                        Todos os dias da semana
                      </span>
                      <span className="text-lg leading-none">🔥</span>
                    </RadioGroupItem>
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" className="flex-1" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
