import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createPostUseCase } from "../../use-cases/create-post";

export async function createPost(request: FastifyRequest, reply: FastifyReply) {

  await request.jwtVerify();


  const createPostBodySchema = z.object({
    fotoLink: z.string().url(),
    descricao: z.string()
  });

  try {
    const { fotoLink, descricao  } = createPostBodySchema.parse(request.body);
    const userId = request.user.sub;

    await createPostUseCase({
    fotoLink,
    descricao,
    userId,
  })} catch (err) {

    throw err;
  }

  return reply.status(201).send();
}