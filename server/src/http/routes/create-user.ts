import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createUser } from '../../features/create-user'

export const createUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/create-user',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          image: z.string().url().optional(),
        }),
      },
    },
    async (req, res) => {
      const { email, image } = req.body

      try {
        const { user, error } = await createUser({ email, image })

        if (error) {
          res.code(409).send({ error })
          return
        }

        if (!user) throw new Error()

        res.code(200).send({ user })
      } catch {
        res.code(500).send({ error: 'Failed to create user' })
      }
    }
  )
}
