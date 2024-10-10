'use client'

import { deleteGoalCompletion } from '@/actions/http/delete-goal-completion'
import LogoIcon from '@/components/icons/logo-icon'
import Loader from '@/components/layout/loader'
import { PendingGoals } from '@/components/layout/pending-goals'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Progress, ProgressIndicator } from '@/components/ui/progress-bar'
import { Separator } from '@/components/ui/separator'
import { useSummary } from '@/hooks/use-summary'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { CheckCircle2, Plus, XCircle } from 'lucide-react'
import Image from 'next/image'

dayjs.locale(ptBR)

export default function Summary() {
  const { data, isLoading } = useSummary()

  const queryClient = useQueryClient()

  const handleDeleteCompletion = async (completionId: string) => {
    await deleteGoalCompletion(completionId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = data
    ? Math.round((data.completed / data.total) * 100)
    : 0

  const hasGoalCompletions =
    data?.goalsPerDay &&
    Object.entries(data.goalsPerDay).flatMap(el => el[1]).length > 0

  return (
    <Loader isLoading={isLoading || !data}>
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-5 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoIcon />
            <span className="font-semibold text-lg capitalize">
              {firstDayOfWeek} - {lastDayOfWeek}
            </span>
          </div>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4" />
              Cadastrar Meta
            </Button>
          </DialogTrigger>
        </div>

        <div className="flex flex-col gap-3">
          <Progress value={data?.completed} max={data?.total}>
            <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
          </Progress>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>
              Você completou{' '}
              <span className="text-zinc-100">{data?.completed}</span> de{' '}
              <span className="text-zinc-100">{data?.total}</span> metas nessa
              semana.
            </span>
            <span>{completedPercentage}%</span>
          </div>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          {!hasGoalCompletions ? (
            <div className="flex flex-col items-center text-zinc-300">
              <Image
                src="/waiting-illustration.svg"
                alt="Person waiting illustration"
                height={320}
                width={320}
              />
              Nenhuma meta cumprida ainda...
            </div>
          ) : (
            <h2 className="font-medium text-xl">Sua semana</h2>
          )}

          {data?.goalsPerDay &&
            Object.entries(data.goalsPerDay).map(([date, goals]) => {
              const weekDay = dayjs(date).format('dddd')
              const formattedDate = dayjs(date).format('D[ de ]MMMM')

              return (
                <div key={date} className="flex flex-col gap-4">
                  <h3 className="font-medium">
                    <span className="capitalize">{weekDay}</span>{' '}
                    <span className="text-xs text-zinc-400">
                      ({formattedDate})
                    </span>
                  </h3>

                  <ul className="flex flex-col gap-1">
                    {goals.map(goal => {
                      const time = dayjs(goal.completedAt).format('HH:mm[h]')

                      return (
                        <li
                          key={goal.id}
                          className="flex w-full items-center gap-2 rounded-full px-2 py-2 hover:bg-zinc-900"
                        >
                          <CheckCircle2 className="size-4 text-pink-500" />
                          <span className="flex-1 text-sm truncate text-zinc-400">
                            Você completou "
                            <span className="text-zinc-100">{goal.title}</span>"
                            às <span className="text-zinc-100">{time}</span>
                          </span>
                          <XCircle
                            role="button"
                            onClick={() => handleDeleteCompletion(goal.id)}
                            className="size-4 cursor-pointer text-zinc-400 hover:text-red-400"
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
        </div>
      </div>
    </Loader>
  )
}
