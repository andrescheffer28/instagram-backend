//import { FastifyRequest, FastifyReply } from "fastify"
import { compare, hash } from "bcryptjs"
import { InvalidCredentialError } from "./errors/invalid-credentials-error"
import { prisma } from "../lib/prisma"

interface AuthenticateUseCaseRequest{
    username: string
    email: string
    senha: string
}

export async function authenticateUseCase({
    username, 
    email, 
    senha
}: AuthenticateUseCaseRequest){
    const senha_hash = await hash(senha, 6)
    
    const user = await prisma.user.findUnique({
        where: {
            email: email,
            username: username
        }
    })

    if(!user){
        throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await compare(senha_hash, user.senha_hash)

    if(!doesPasswordMatches){
        throw new InvalidCredentialError()
    }

    return {
        user
    }
}