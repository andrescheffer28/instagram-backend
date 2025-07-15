import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterUseCaseRequest{
    username: string
    email: string
    senha: string
}

export async function registerUseCase({
    username, 
    email, 
    senha
}: RegisterUseCaseRequest){
    
    const userWithSameData = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if(userWithSameData){
    throw new UserAlreadyExistsError()
    }

    const senha_hash = await hash(senha, 6)

    await prisma.user.create({
    data: {
        username,
        email,
        senha_hash
    },
    })
}