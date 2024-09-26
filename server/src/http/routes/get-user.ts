import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getUser } from '../../features/get-user'

export const getUserRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/user',
    {
      schema: {
        querystring: z.object({
          email: z.string().min(1),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              email: z.string(),
              password: z.string().nullable().optional(),
              createdAt: z.date(),
            }),
          }),
          404: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { email } = req.query

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
