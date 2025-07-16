import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { NotAuthorizedError } from "../../use-cases/errors/not-authorized-error"
import { UserNotFoundError } from "../../use-cases/errors/user-not-found-error";
import { editProfileUseCase } from "../../use-cases/edit-profile";

export async function editProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {

  await request.jwtVerify();

  const editProfileBodySchema = z.object({
    fotoDePerfil: z.string().url()
  })

  try {
    const { fotoDePerfil } = editProfileBodySchema.parse(request.body)
    const userId = request.user.sub

    await editProfileUseCase({
      id: userId,
      fotoDePerfil: fotoDePerfil
    })

    return reply.status(200).send()
  } catch (err) {

    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof NotAuthorizedError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
}