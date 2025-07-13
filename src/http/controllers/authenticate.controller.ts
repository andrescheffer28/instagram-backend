import { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { authenticateUseCase } from "../../use-cases/authenticate"
import { InvalidCredentialError } from "../../use-cases/errors/invalid-credentials-error"

export async function authenticate(request: FastifyRequest, reply: FastifyReply){
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
  })
  const { username, email, senha } = registerBodySchema.parse(request.body)

  try{
    await authenticateUseCase({
        username,
        email,
        senha
    })
  } catch (err) {
    if(err instanceof InvalidCredentialError){
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}