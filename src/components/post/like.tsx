"use client"

import { useState } from "react";

import { HeartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { abbrNum } from "@/lib/utils";

import type { Post } from "@/types/post";

export function Like({ post, userId }: { post: Post, userId?: string }) {
  const [active, setActive] = useState(post.liked ?? false)

  return (
    <form onSubmit={() => {}}>
      <input type="hidden" name="postId" value={post.id} />
      <input type="hidden" name="userId" value={userId} />
      <Button
        color="red"
        onClick={() => setActive(true)}
        size={"icon"}
        variant={"ghost"}
        className="grid grid-cols-[auto_auto] gap-2"
      >
        <HeartIcon size={14} />
        {abbrNum(active ? post.likes + 1 : post.likes, 2)}
      </Button>
    </form>
  )
}