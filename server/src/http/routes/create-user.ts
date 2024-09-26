import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createUser } from '../../features/create-user'

export const createUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/create-user',
    {
      schema: {
        body: z.object({
          email: z.string().min(1),
          password: z.string().min(1).optional(),
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
          409: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { email, password } = req.body

      try {
        const { user, error } = await createUser({ email, password })

        if (error) {
          res.code(409).send({ error })
          return
        }

        if (!user) throw new Error('Failed to create user')

        res.code(200).send({ user })
      } catch (err) {
        res.code(500).send({ error: 'Failed to create user' })
      }
    }
  )
}
