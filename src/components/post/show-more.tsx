"use client"

import { useState, useEffect, type RefObject, Fragment, useRef } from "react";

import { Post } from "@/components/post";
import { Spinner } from "@/components/ui/spinner";

import { type TPost, getAllPosts } from "@/actions/posts/get-all";

import type { User } from "@prisma/client";

function useInView(ref: RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (ref?.current) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsInView(entry.isIntersecting);
      });

      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [ref]);

  return { isInView };
};

function useInfiniteScroll(ref: RefObject<HTMLElement>, userId: string) {
  const { isInView } = useInView(ref);
  const [posts, setPosts] = useState<TPost[]>([])
  const [page, setPage] = useState(1)
  const [max, setMax] = useState(false)

  useEffect(() => {
    if (isInView) {
      getAllPosts(userId, page)
        .then((res) => {     
          if(res.length < 9) 
            setMax(true)
            
          setPosts(prevPosts => [...prevPosts, ...res])

          setPage(page + 1)
        });
    }
  }, [isInView]);

  return { posts, max }
}

export function ShowMorePosts({ user }: { user: User }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { posts, max } = useInfiniteScroll(ref, user.id);

  return (
    <>
      {posts.map(post => (
        <Fragment key={post.id}>
          {post.user && <Post post={post} user={user} />}
        </Fragment>
      ))}
      {!max && <Spinner ref={ref} className="p-4" />}
    </>
  );
}