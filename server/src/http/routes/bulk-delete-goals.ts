import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteGoals } from '../../features/delete-goals'

export const bulkDeleteGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/delete-goals',
    {
      schema: {
        body: z.object({
          userId: z.string(),
          goalIds: z.array(z.string()),
        }),
      },
    },
    async (req, res) => {
      const { goalIds, userId } = req.body

      try {
        const { goals } = await deleteGoals({ goalIds, userId })

        res.code(200).send({ goals })
      } catch {
        res.code(500).send({ error: 'Failed to delete goals' })
      }
    }
  )
}
