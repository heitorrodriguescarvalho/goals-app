import { fastifyCors } from '@fastify/cors'
import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { createCompletionRoute } from './http/routes/create-completion'
import { createGoalRoute } from './http/routes/create-goal'
import { createUserRoute } from './http/routes/create-user'
import { deleteCompletionRoute } from './http/routes/delete-goal-completion'
import { getPendingGoalsRoute } from './http/routes/get-pending-goals'
import { getUserRoute } from './http/routes/get-user'
import { getWeekSummaryRoute } from './http/routes/get-week-summary'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: env.ORIGIN_URL,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(createUserRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)
app.register(getUserRoute)
app.register(deleteCompletionRoute)

app
  .listen({
    port: env.PORT || 3333,
  })
  .then(() => {
    console.log(`HTTP Server running on port: ${env.PORT || 3333}`)
  })
