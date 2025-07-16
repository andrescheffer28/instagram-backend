import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function profile(request: FastifyRequest, reply: FastifyReply) {

  await request.jwtVerify();

  const updateProfileBodySchema = z.object({
    fotoDePerfil: z.string().url(),
  });

  try {
    const { fotoDePerfil } = updateProfileBodySchema.parse(request.body);
    const userId = request.user.sub; 

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fotoDePerfil: fotoDePerfil,
      },
    });

    return reply.status(204).send();

  } catch (err) {

    throw err;
  }
}