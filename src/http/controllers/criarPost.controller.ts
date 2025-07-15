import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createPostUseCase } from "../../use-cases/create-post";

export async function criarPost(request: FastifyRequest, reply: FastifyReply) {
  // 1. Garante que o usuário está autenticado e pega o ID do JWT
  await request.jwtVerify();

  // 2. Define e valida o que esperamos receber no corpo da requisição
  const criarPostBodySchema = z.object({
    fotoLink: z.string().url(),
    descricao: z.string()
  });

  try {
    const { fotoLink, descricao  } = criarPostBodySchema.parse(request.body);
    const userId = request.user.sub; // ID do usuário vindo do JWT

    // 3. Atualiza a foto de perfil do usuário no banco de dados
    await createPostUseCase({
    fotoLink,
    descricao,
    userId,
  })} catch (err) {

    throw err;
  }

  return reply.status(201).send();
}