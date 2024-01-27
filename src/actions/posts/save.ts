"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function savePost(data: FormData) {
  const status = data.get("status")?.toString() ?? "";
  const userId = data.get("userId")?.toString() ?? "";

  await prisma.post.create({
    data: {
      status: status,
      authorId: userId,
      comments: 0,
      likes: 0,
      shares: 0,
      views: 0,
    }
  })

  revalidatePath("/")
}