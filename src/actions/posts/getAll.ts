import prisma from "@/lib/prisma";
import { getUserById } from "../users/get";

export async function getAllPosts() {
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
      user: await getUserById(post.authorId ?? "")
    }))
  )
}