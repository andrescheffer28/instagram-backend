import { prisma } from "../lib/prisma"
import { PostNotFoundError } from "./errors/post-not-found-error"
import { NotAuthorizedError } from "./errors/not-authorized-error"

interface EditPostUseCaseRequest {
  postId: string
  userId: string
  descricao: string
}

export async function editPostUseCase({
  postId,
  userId,
  descricao
}: EditPostUseCaseRequest) {

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw new PostNotFoundError();
  }

  if (post.user_id !== userId) {
    throw new NotAuthorizedError();
  }

  await prisma.post.update({
    where: {
      id: postId,
    },
    data:{
      descricao: descricao
    }
  })
}