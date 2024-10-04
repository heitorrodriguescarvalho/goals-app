import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getWeekPendingGoals } from '../../features/get-week-pending-goals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals/:userId', {
    schema: {
      params: z.object({
        userId: z.string()
      })
    }
  }, async (req) => {
    const { userId } = req.params

    const { pendingGoals } = await getWeekPendingGoals({ userId })

    return { pendingGoals }
  })
}