import { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { registerUseCase } from "../../use-cases/register"
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error"

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
    if(err instanceof UserAlreadyExistsError){
      return reply.status(409).send();
    }

    throw err
  }

  return reply.status(201).send()
}