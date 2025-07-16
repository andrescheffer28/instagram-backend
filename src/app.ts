import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { InvalidCredentialError } from './use-cases/errors/invalid-credentials-error'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError){
        return reply  
            .status(400)
            .send( {message: 'Validation err', issues: error.format()} )
    }

    if (error.statusCode) {
        return reply.status(error.statusCode).send()
    }

    if (env.NODE_ENV !== 'production'){
        console.error(error)
    }

    return reply.status(500).send({ message: 'Internal Server Error.' })
})
