"use client"

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export function BackPost() {
  const { back } = useRouter()

  return (
    <header className="flex items-center gap-4">
      <Button
        onClick={back}
        size={"icon"}
        variant={"ghost"}
      >
       <ChevronLeftIcon /> 
      </Button>
      <span>Post</span>
    </header>
  )
}