import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // 1. Garante que o usuário está autenticado e pega o ID do JWT
  await request.jwtVerify();

  // 2. Define e valida o que esperamos receber no corpo da requisição
  const updateProfileBodySchema = z.object({
    fotoDePerfil: z.string().url(), // Garante que é uma string e uma URL válida
  });

  try {
    const { fotoDePerfil } = updateProfileBodySchema.parse(request.body);
    const userId = request.user.sub; // ID do usuário vindo do JWT

    // 3. Atualiza a foto de perfil do usuário no banco de dados
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fotoDePerfil: fotoDePerfil,
      },
    });

    // 4. Retorna uma resposta de sucesso sem conteúdo
    return reply.status(204).send();

  } catch (err) {
    // Se o JWT for inválido, o request.jwtVerify() já retorna 401.
    // O Zod retorna um erro 400 se a validação falhar, que será tratado pelo nosso app.setErrorHandler.
    // Aqui, reenviamos qualquer outro erro que possa ocorrer.
    throw err;
  }
}