import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteGoalCompletion } from '../../features/delete-goal-completion'

export const deleteCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/delete-completion',
    {
      schema: {
        body: z.object({
          userId: z.string(),
          completionId: z.string(),
        }),
      },
    },
    async (req, res) => {
      const { completionId, userId } = req.body

      try {
        const { goalCompletion } = await deleteGoalCompletion({ completionId, userId})

        res.code(200).send({ goalCompletion })
      } catch {
        res.code(500).send({ error: 'Failed to delete goal completion' })
      }
    }
  )
}
