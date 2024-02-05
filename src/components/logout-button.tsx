"use client"

import { LogOutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useAuth } from "@/contexts/auth-context"

export function Logout() {
  const { logout } = useAuth()

  return (
    <Button
      variant={"link"}
      onClick={logout}
      className="text-red-500 p-0 h-max flex gap-2"
    >
      Logout
      <LogOutIcon size={18} />
    </Button>
  )
}