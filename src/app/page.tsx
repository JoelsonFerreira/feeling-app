"use client"

import { Auth } from "@/components/common/auth";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CreatePost } from "@/components/post/create-post";
import { ShowMorePosts } from "@/components/post/show-more";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useChat } from "@/contexts/server-context";
import { useAuth } from "@/contexts/auth-context";

export default function Home() {
  const { morePosts, fetchMore } = useChat();
  const { user, loading } = useAuth()

  if (loading) return <Spinner />;

  if (!user) return <Auth />;

  return (
    <main className="grid gap-4">
      {morePosts.length > 0 && (
        <Button
          className="fixed z-20 top-2 right-1/2 translate-x-1/2 rounded-full flex items-center justify-center p-2 gap-2 h-max w-max"
          size={"icon"}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            fetchMore("#posts-list [data-radix-scroll-area-viewport]")
          }}
        >
          <Avatar>
            <AvatarImage alt="" src={morePosts[morePosts.length - 1].avatar ?? ""} />
            <AvatarFallback>
              {morePosts[morePosts.length - 1].userId.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {morePosts.length > 9 ? <>+9</> : <>{morePosts.length}</>}
        </Button>
      )}

      <CreatePost />

      <ShowMorePosts />
    </main>
  );
}
