import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getUser } from '../../features/get-user'

export const getUserRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/user/:email',
    {
      schema: {
        params: z.object({
          email: z.string().email(),
        }),
      },
    },
    async (req, res) => {
      const { email } = req.params

      try {
        const { user, error } = await getUser({ email })

        if (error) {
          res.code(404).send({ error: 'User not found' })
          return
        }

        if (!user) throw new Error()

        res.code(200).send({ user })
      } catch (err) {
        res.code(500).send({ error: 'Failed to fetch user' })
      }
    }
  )
}
