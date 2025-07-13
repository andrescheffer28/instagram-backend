import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function editarPost(request: FastifyRequest, reply: FastifyReply) {
  // 1. Garante que o usuário está autenticado e pega o ID do JWT
  await request.jwtVerify();

  // 2. Define e valida o que esperamos receber no corpo da requisição
  const editarPostBodySchema = z.object({
    descricao: z.string(), // Garante que é uma string e uma URL válida
  });

  const editPostParamsSchema = z.object({
    postId: z.string().uuid(),
  });

  try {
    const { descricao } = editarPostBodySchema.parse(request.body)
    const { postId } = editPostParamsSchema.parse(request.params)
    const userId = request.user.sub; // ID do usuário vindo do JWT

    // 3. Atualiza a foto de perfil do usuário no banco de dados
    await prisma.post.updateMany({
      where: {
        id: postId,
        user_id: userId,
      },
      data: {
        descricao: descricao,
      },
    });

    // 4. Retorna uma resposta de sucesso sem conteúdo
    return reply.status(204).send();

  } catch (err) {

    throw err;
  }
}