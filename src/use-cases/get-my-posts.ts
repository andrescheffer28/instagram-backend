import { prisma } from "../lib/prisma";
import { UserNotFoundError } from "./errors/user-not-found-error"; // Reutilizaremos este conceito de erro

interface GetMyPostsUseCaseRequest {
  userId: string;
}

export async function getMyPostsUseCase({ userId }: GetMyPostsUseCaseRequest) {

  const userWithPosts = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {

      posts: {
        orderBy: {
          data: "desc",
        },
      },
    },
  });

  if (!userWithPosts) {
    throw new UserNotFoundError(); 
  }


  const formattedPosts = userWithPosts.posts.map((post) => {
    return {
      foto: post.fotoLink,
      description: post.descricao,
      post_id: post.id,
    };
  });

  return {
    user_photo: userWithPosts.fotoDePerfil,
    username: userWithPosts.username,
    posts: formattedPosts,
  };
}