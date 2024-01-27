"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function likePost(data: FormData) {
  const postId = data.get("postId")?.toString() ?? "";

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if(post) {
    await prisma.post.update({
      where: { id: post.id },
      data: { likes: post.likes + 1 }
    })
  
    revalidatePath("/")
  }
}