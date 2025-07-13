import { prisma } from "../lib/prisma"
import { PostNotFoundError } from "./errors/post-not-found-error"
import { NotAuthorizedError } from "./errors/not-authorized-error"

interface DeletePostUseCaseRequest {
  postId: string;
  userId: string;
}

export async function deletePostUseCase({
  postId,
  userId,
}: DeletePostUseCaseRequest) {

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new PostNotFoundError();
  }

  if (post.user_id !== userId) {
    throw new NotAuthorizedError();
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
}