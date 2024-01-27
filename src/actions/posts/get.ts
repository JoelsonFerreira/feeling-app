import prisma from "@/lib/prisma";
import { getUserById } from "@/actions/users/get";

export async function getPostReplies(postId: string) {
  const posts = await prisma.post.findMany({
    where: {
      parentId: postId
    },
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
      comments: post.parentId ? await prisma.post.count({ where: { id: post.parentId } }) : 0,
      user: await getUserById(post.authorId ?? "")
    }))
  )
}

export async function getPost(postId: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    },
  })

  if (!post) return;

  await prisma.post.update({
    where: {
      id: post.id
    },
    data: {
      views: post.views + 1
    }
  })

  return {
    ...post,
    comments: post.parentId ? await prisma.post.count({ where: { id: post.parentId } }) : 0,
    user: await getUserById(post.authorId ?? "")
  }
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
      comments: post.parentId ? await prisma.post.count({ where: { id: post.parentId } }) : 0,
      user: await getUserById(post.authorId ?? "")
    }))
  )
}