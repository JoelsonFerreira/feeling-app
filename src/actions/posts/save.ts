"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function savePost(data: FormData) {
  const status = data.get("status")?.toString() ?? "";
  const userId = data.get("userId")?.toString() ?? "";
  const parentPostId = data.get("parentPostId")?.toString();

  await prisma.post.create({
    data: {
      status: status,
      authorId: userId,
      ...parentPostId ? {parentId: parentPostId} : {},
      shares: 0,
    }
  })

  revalidatePath("/")
}