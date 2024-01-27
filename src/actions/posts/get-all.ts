"use server";

import prisma from "@/lib/prisma";
import { Post, User } from "@prisma/client";
import { getPostRelations, viewPost } from "./get";

export type TPost = Post & { comments: number, likes: number, views: number, user: User | null }

export async function getAllPosts(userId: string, page?: number): Promise<TPost[]> {
  const dafaultPageSize = 9;

  const posts = await prisma.post.findMany({
    skip: dafaultPageSize * (page ?? 0),
    take: dafaultPageSize,
    orderBy: {
      createdAt: "desc"
    },
  })

  await Promise.all(posts.map(post => viewPost(post.id, userId)))

  return Promise.all(posts.map(post => getPostRelations(post)))
}