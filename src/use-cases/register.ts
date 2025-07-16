import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error"
import { UsernameAlreadyExistsError } from "./errors/username-already-exists-error"

interface RegisterUseCaseRequest{
    username: string
    email: string
    senha: string
    user_photo?: string
}

export async function registerUseCase({
    username, 
    email, 
    senha,
    user_photo
}: RegisterUseCaseRequest){
    
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if(userWithSameEmail){
    throw new EmailAlreadyExistsError()
    }

    const userWithSameUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if(userWithSameUsername){
    throw new UsernameAlreadyExistsError()
    }

    const senha_hash = await hash(senha, 6)

    await prisma.user.create({
      data: {
          username,
          email,
          senha_hash,
          fotoDePerfil: user_photo
      },
    })
}