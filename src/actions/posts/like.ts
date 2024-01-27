"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function likePost(data: FormData) {
  const postId = data.get("postId")?.toString() ?? "";
  const userId = data.get("userId")?.toString() ?? "";

  try {
    await prisma.like.create({
      data: {
        postId,
        userId
      }
    })
  
    revalidatePath("/")

  } catch {

  }
}