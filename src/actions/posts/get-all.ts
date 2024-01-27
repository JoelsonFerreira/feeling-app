import prisma from "@/lib/prisma";
import { Post, User } from "@prisma/client";
import { getPostRelations, viewPost } from "./get";

export type TPost = Post & { comments: number, likes: number, views: number, user: User | null }

export async function getAllPosts(userId: string): Promise<TPost[]> {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  await Promise.all(posts.map(post => viewPost(post.id, userId)))

  return Promise.all(posts.map(post => getPostRelations(post)))
}