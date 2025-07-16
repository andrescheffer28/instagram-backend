import { prisma } from "../lib/prisma"
import { NotAuthorizedError } from "./errors/not-authorized-error"

interface EditProfileUseCaseRequest {
  id: string
  fotoDePerfil
: string
}

export async function editProfileUseCase({
  id,
  fotoDePerfil
}: EditProfileUseCaseRequest) {

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    throw new NotAuthorizedError();
  }

  await prisma.user.update({
    where: {
      id,
    },
    data:{
      fotoDePerfil
    }
  })
}