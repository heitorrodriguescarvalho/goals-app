import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getWeekSummary } from '../../features/get-week-summary'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/summary/:userId', {
    schema: {
      params: z.object({
        userId: z.string(),
      })
    }
  }, async (req) => {
    const { userId } = req.params

    const { summary } = await getWeekSummary({ userId })

    return { summary }
  })
}
