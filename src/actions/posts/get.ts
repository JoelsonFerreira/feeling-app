"use server";

import prisma from "@/lib/prisma";
import { getUserById } from "@/actions/users/get";
import { Post } from "@prisma/client";

export async function getPostRelations(post: Post, userId: string) {
  return {
    ...post,
    comments: await prisma.post.count({ where: { parentId: post.id } }),
    likes: await prisma.like.count({ where: { postId: post.id } }),
    views: await prisma.view.count({ where: { postId: post.id } }),
    user: await getUserById(post.authorId ?? ""),
    liked: !!await prisma.like.findFirst({ where: { userId, postId: post.id } })
  }
}

export async function viewPost(postId: string, userId: string) {
  try {    
    return await prisma.view.create({
      data: {
        postId,
        userId,
      }
    });
  } catch(err) {
    return null;
  }
}

export async function getPostReplies(postId: string, userId: string) {
  const posts = await prisma.post.findMany({
    where: {
      parentId: postId
    },
  })

  await Promise.all(posts.map(post => viewPost(post.id, userId)))

  return Promise.all(posts.map(post => getPostRelations(post, userId)))
}

export async function getPost(postId: string, userId: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    },
  })

  if (!post) return;

  await viewPost(post.id, userId)

  return getPostRelations(post, userId)
}

export async function getPostsByUser(userId: string) {
  const posts = await prisma.post.findMany({
    where: {
      author: {
        id: userId
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  await Promise.all(posts.map(post => viewPost(post.id, userId)))

  return Promise.all(posts.map(post => getPostRelations(post, userId)))
}