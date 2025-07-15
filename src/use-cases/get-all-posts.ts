import { prisma } from "../lib/prisma";

export async function getAllPostsUseCase() {

  const posts = await prisma.post.findMany({

    include: {
      user: {
        select: {
          username: true,
          fotoDePerfil: true,
        },
      },
    },

    orderBy: {
      data: "desc",
    },
  });

  const formattedPosts = posts.map((post) => {
    return {
      post_id: post.id,
      username: post.user.username,
      post_photo: post.fotoLink,
      description: post.descricao,
      user_photo: post.user.fotoDePerfil,
    };
  });

  return {
    posts: formattedPosts,
  };
}