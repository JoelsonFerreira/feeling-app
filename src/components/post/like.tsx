"use client"
import { useState } from "react";

import { LikeIcon } from "@/icons/like";

import { ButtonIcon } from "@/components/ui/button";

import { likePost } from "@/actions/posts/like";
import { TPost } from "@/actions/posts/get-all";

import { abbrNum } from "@/lib/utils";

export function Like({ post, userId }: { post: TPost, userId?: string }) {
  const [active, setActive] = useState(post.liked ?? false)

  return (
    <form action={likePost}>
      <input type="hidden" name="postId" value={post.id} />
      <input type="hidden" name="userId" value={userId} />
      <ButtonIcon
        color="red"
        icon={<LikeIcon />}
        onClick={() => setActive(true)}
        label={abbrNum(active ? post.likes + 1 : post.likes, 2)}
        active={active}
      />
    </form>
  )
}