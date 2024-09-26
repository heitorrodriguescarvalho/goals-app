import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createGoalCompletion } from '../../features/create-goal-completion'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
        response: {
          200: z.object({
            goalCompletion: z.object({
              id: z.string(),
              goalId: z.string(),
              createdAt: z.date(),
            }),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { goalId } = req.body

      try {
        const { goalCompletion } = await createGoalCompletion({
          goalId,
        })

        res.code(200).send({ goalCompletion })
      } catch (err) {
        res.code(500).send({ error: 'Failed to create goal completion' })
      }
    }
  )
}
