import prisma from "@/lib/prisma";
import { Post, User } from "@prisma/client";
import { getUserById } from "@/actions/users/get";

export type TPost = Post & { comments: number, user: User | null }

export async function getAllPosts(): Promise<TPost[]> {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  await Promise.all(
  posts.map(post => 
      prisma
        .post
        .update({ 
          where: { 
            id: post.id 
          }, 
          data: { 
            views: post.views + 1 
          } 
        })
    )
  )

  return Promise.all(
    posts.map(async post => ({
      ...post,
      comments: await prisma.post.count({ where: { parentId: post.id } }),
      user: await getUserById(post.authorId ?? "")
    }))
  )
}