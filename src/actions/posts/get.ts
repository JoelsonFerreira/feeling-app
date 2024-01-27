import prisma from "@/lib/prisma";

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

  return posts
}