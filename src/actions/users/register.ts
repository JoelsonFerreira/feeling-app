"use server"

import { redirect } from "next/navigation"

import prisma from "@/lib/prisma"


export async function registerUser(data: FormData) {
  const email = data.get("email")?.toString() ?? ""
  const username = data.get("username")?.toString() ?? ""
  const name = data.get("name")?.toString() ?? ""
  const password = data.get("password")?.toString() ?? ""
  // const avatar = data.get("avatar") as File
  
  await prisma.user.create({
    data: {
      id: username,
      email,
      name,     
      password,
    }
  })

  redirect("/")
}