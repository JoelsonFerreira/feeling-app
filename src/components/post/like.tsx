"use client"

import { useState } from "react";

import { HeartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useChat } from "@/contexts/server-context";

import { abbrNum } from "@/lib/utils";

import type { Post } from "@/types/post";

export function Like({ post }: { post: Post }) {
  const [active, setActive] = useState(post.liked ?? false)
  const { like } = useChat()

  const handleLikePost = () => {
    setActive(true)
    like(post.id)
  }

  return (
    <Button
      color="red"
      onClick={handleLikePost}
      size={"icon"}
      variant={"ghost"}
      className={`grid grid-cols-[auto_auto] gap-2 ${active ? "text-red-500" : ""}`}
    >
      <HeartIcon size={14} />
      {abbrNum(post.likes, 2)}
    </Button>
  )
}