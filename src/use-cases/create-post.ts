import { prisma } from "../lib/prisma"

interface createPostUseCaseRequest{
    fotoLink: string
    descricao?: string
    userId: string
}

export async function createPostUseCase({
    fotoLink, 
    descricao, 
    userId
}: createPostUseCaseRequest){
    await prisma.post.create({
    data: {
      fotoLink,
      descricao,
      user_id: userId,
    },
  });
}