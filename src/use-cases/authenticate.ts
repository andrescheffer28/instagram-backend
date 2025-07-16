//import { FastifyRequest, FastifyReply } from "fastify"
import { compare } from "bcryptjs"
import { InvalidCredentialError } from "./errors/invalid-credentials-error"
import { prisma } from "../lib/prisma"

interface AuthenticateUseCaseRequest{
    email: string
    senha: string
}

export async function authenticateUseCase({
    email, 
    senha
}: AuthenticateUseCaseRequest){
    
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    if(!user){
        throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await compare(senha, user.senha_hash)

    if(!doesPasswordMatches){
        throw new InvalidCredentialError()
    }

    return {
        user
    }
}