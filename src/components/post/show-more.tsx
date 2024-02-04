"use client"

import { useState, useEffect, Fragment, useRef } from "react";

import { Post } from "@/components/post";
import { Spinner } from "@/components/ui/spinner";

import { useInView } from "@/hooks/useInView";

import { useChat } from "@/contexts/server-context";

import type { User } from "@/types/user";

export function ShowMorePosts({ user }: { user: User }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isInView } = useInView(ref);
  const { fetchMorePosts, posts } = useChat()
  const [maxPosts, setMaxPosts] = useState(false)

  useEffect(() => {
    async function fetchMore() {
      if (isInView) {
        const { data } = await fetchMorePosts();
  
        if(!data || data.pages[data.pages.length - 1].data.length < 9) 
          setMaxPosts(true)
      }
    }
    fetchMore();
  }, [isInView, fetchMorePosts]);

  return (
    <>
      {posts.map(post => (
        <Fragment key={post.id}>
          {post.user && <Post post={post} user={user} />}
        </Fragment>
      ))}
      {!maxPosts && <Spinner ref={ref} className="p-4" />}
    </>
  );
}