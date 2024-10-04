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
          userId: z.string(),
        }),
      },
    },
    async (req, res) => {
      const { goalId, userId } = req.body

      try {
        const { goalCompletion } = await createGoalCompletion({
          goalId,
          userId,
        })

        res.code(200).send({ goalCompletion })
      } catch (err) {
        res.code(500).send({ error: 'Failed to create goal completion' })
      }
    }
  )
}
