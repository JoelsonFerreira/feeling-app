"use server"

import prisma from "@/lib/prisma"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginUser(data: FormData) {
  const name = data.get("name")?.toString() ?? ""
  const password = data.get("password")?.toString() ?? ""

  const user = await prisma.user.findUnique({
    where: {
      id: name
    }
  })
  
  if(user?.password === password) {
    cookies().set("auth_token", user.id)

    redirect("/")
  }
  
  return
}