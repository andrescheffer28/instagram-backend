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
    const senha_hash = await hash(senha, 6)
    
    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
            username
        }
    })

    if(userWithSameEmail){
    throw new UserAlreadyExistsError()
    }

    await prisma.user.create({
    data: {
        username,
        email,
        senha_hash
    },
    })
}