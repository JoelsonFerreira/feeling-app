"use client"

import Link from "next/link";
import { useEffect, useRef } from "react";

import { BarChartIcon, MessageCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Like } from "@/components/post/like";

import { abbrNum, timeSince } from "@/lib/utils";

import type { Post } from "@/types/post";


function PostFooter({ post }: { post: Post }) {
  return (
    <footer className="grid grid-cols-3 gap-2 w-max ml-auto">
      <Button
        color="blue"
        size={"icon"}
        variant={"ghost"}
        className="grid grid-cols-[auto_auto] gap-2"
      >
        <BarChartIcon size={14} />
        {abbrNum(post.views, 2)}
      </Button>
      <Button
        color="blue"
        size={"icon"}
        variant={"ghost"}
        className="grid grid-cols-[auto_auto] gap-2"
        asChild
      >
        <Link href={`/post/${post.id}`}>
          <MessageCircleIcon size={14} />
          {abbrNum(post.comments, 2)}
        </Link>
      </Button>
      <Like post={post} />
    </footer>
  )
}

function PostContent({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.id}`} className="text-sm">
      <span>{post.status}</span>
    </Link>
  )
}

export function Post({ post }: { post: Post }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(ref.current) {
      setTimeout(function(){
        if(ref.current) {
          ref.current.style.transform = "translateX(0)";
          ref.current.style.opacity = "1";
        }
      })
    }
  }, [ref])

  return (
    <Card className="p-4 transition-all duration-700 translate-x-full opacity-0" ref={ref}>
      <CardHeader className="grid grid-cols-[auto_1fr] items-center gap-2 p-0 space-y-0">
        <Avatar>
          <AvatarImage alt="" src={post.user?.avatar ?? ""} />
          <AvatarFallback>
            {post.user?.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-row items-center gap-1 justify-between">
          <Link href="/" className="font-semibold hover:underline leading-none">{post.user?.name}</Link>
          <div className="flex items-center gap-2">
            <span className="text-sm leading-none">@{post.user?.id}</span>
            <span className="text-sm leading-none relative flex items-center">{timeSince(new Date(post.createdAt))}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="w-full flex flex-col p-0 pt-2">
        <PostContent post={post} />
      </CardContent>
      <CardFooter className="p-0">
        <PostFooter post={post} />
      </CardFooter>
      <div className="grid gap-4">
        {post.children.map(child => <Post key={child.id} post={child} />)}
      </div>
    </Card>
  )
}