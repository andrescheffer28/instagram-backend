import { FastifyReply, FastifyRequest } from "fastify";
import { getMyPostsUseCase } from "../../use-cases/get-my-posts";
import { UserNotFoundError } from "../../use-cases/errors/user-not-found-error";

export async function getMyPosts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {

    await request.jwtVerify();
    const userId = request.user.sub;

    const result = await getMyPostsUseCase({ userId });

    return reply.status(200).send(result);
  } catch (err) {

    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}