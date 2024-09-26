import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createGoal } from '../../features/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
        response: {
          200: z.object({
            goal: z.object({
              title: z.string(),
              desiredWeeklyFrequency: z.number(),
              id: z.string(),
              createdAt: z.date(),
              userId: z.string().nullable(),
            }),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { title, desiredWeeklyFrequency } = req.body

      try {
        const { goal } = await createGoal({
          title: title,
          desiredWeeklyFrequency: desiredWeeklyFrequency,
        })

        res.code(200).send({ goal })
      } catch (err) {
        res.code(500).send({ error: 'Failed to create goal' })
      }
    }
  )
}
