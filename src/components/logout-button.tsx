"use client"

import { LogOutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useChat } from "@/contexts/server-context"

export function Logout() {
  const { logout } = useChat()

  return (
    <Button
      variant={"link"}
      onClick={async () => {
        await logout();
        window.location.reload();
      }}
      className="text-red-500 p-0 h-max flex gap-2"
    >
      Logout
      <LogOutIcon size={18} />
    </Button>
  )
}