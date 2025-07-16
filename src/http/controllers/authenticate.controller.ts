import { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { authenticateUseCase } from "../../use-cases/authenticate"
import { InvalidCredentialError } from "../../use-cases/errors/invalid-credentials-error"

export async function authenticate(request: FastifyRequest, reply: FastifyReply){
  const registerBodySchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6),
  })
  const { email, senha } = registerBodySchema.parse(request.body)

  try{
    const { user } = await authenticateUseCase({
        email,
        senha
    })

    const token = await reply.jwtSign({},{
      sign:{
        sub: user.id,
        expiresIn: "2h"
      },
    })

    return reply.status(200).send({
      token
    })
  } catch (err) {
    if(err instanceof InvalidCredentialError){
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }
}