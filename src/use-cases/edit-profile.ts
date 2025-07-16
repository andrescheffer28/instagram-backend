import { prisma } from "../lib/prisma"
import { NotAuthorizedError } from "./errors/not-authorized-error"

interface EditPostUseCaseRequest {
  id: string
  fotoLink: string
}

export async function editProfileUseCase({
  id,
  fotoLink
}: EditPostUseCaseRequest) {

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    throw new NotAuthorizedError();
  }

  await prisma.post.update({
    where: {
      id,
    },
    data:{
      fotoLink
    }
  })
}