import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PostNotFoundError } from "../../use-cases/errors/post-not-found-error"
import { NotAuthorizedError } from "../../use-cases/errors/not-authorized-error"
import { editPostUseCase } from "../../use-cases/edit-post"

export async function editPost(
  request: FastifyRequest,
  reply: FastifyReply
) {

  await request.jwtVerify();

  const editPostParamsSchema = z.object({
    postId: z.string().uuid(),
  })

  const editPostBodySchema = z.object({
    descricao: z.string()
  })

  try {
    const { postId } = editPostParamsSchema.parse(request.params)
    const { descricao } = editPostBodySchema.parse(request.body)
    const userId = request.user.sub

    await editPostUseCase({
      postId: postId,
      userId: userId,
      descricao: descricao
    })

    return reply.status(200).send()
  } catch (err) {

    if (err instanceof PostNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof NotAuthorizedError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
}