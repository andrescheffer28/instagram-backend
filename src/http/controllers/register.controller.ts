import { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { registerUseCase } from "../../use-cases/register"
import { EmailAlreadyExistsError } from "../../use-cases/errors/email-already-exists-error"
import { UsernameAlreadyExistsError } from "../../use-cases/errors/username-already-exists-error"

export async function register(request: FastifyRequest, reply: FastifyReply){
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
  })
  const { username, email, senha } = registerBodySchema.parse(request.body)

  try{
    await registerUseCase({
        username,
        email,
        senha
    })
  } catch (err) {
    if(err instanceof EmailAlreadyExistsError){
      return reply.status(409).send({ message: err.message});
    }

    if(err instanceof UsernameAlreadyExistsError){
      return reply.status(409).send({ message: err.message});
    }

    throw err
  }

  return reply.status(201).send()
}