import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { deletePostUseCase } from "../../use-cases/delete-post";
import { PostNotFoundError } from "../../use-cases/errors/post-not-found-error";
import { NotAuthorizedError } from "../../use-cases/errors/not-authorized-error";

export async function deletarPost(
  request: FastifyRequest,
  reply: FastifyReply
) {

  await request.jwtVerify();

  const deletePostParamsSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const { id } = deletePostParamsSchema.parse(request.params);
    const userId = request.user.sub; 

    await deletePostUseCase({
      postId: id,
      userId: userId,
    });

    return reply.status(200).send();
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