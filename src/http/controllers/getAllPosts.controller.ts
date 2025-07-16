import { FastifyReply, FastifyRequest } from "fastify";
import { getAllPostsUseCase } from "../../use-cases/get-all-posts";

export async function getAllPosts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {

    await request.jwtVerify();

    const { posts } = await getAllPostsUseCase();

    return reply.status(200).send({ posts });
  } catch (err) {

    throw err;
  }
}