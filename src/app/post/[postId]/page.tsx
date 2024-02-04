"use client"
import { useQuery } from "react-query"
import type { AxiosResponse } from "axios"

import { Post } from "@/components/post"
import { BackPost } from "@/components/post/back-post"
import { CreatePost } from "@/components/post/create-post"

import { api, useChat } from "@/contexts/server-context"

import type { Post as TPost } from "@/types/post"
import { Fragment } from "react"

type PostPageProps = {
  params: {
    postId: string
  }
}

export default function PostPage({ params: { postId } }: PostPageProps) {
  const { user } = useChat()
  const { data: postData } = useQuery<AxiosResponse<TPost>>(`user`, () => api.get(`/posts/${postId}`), { retry: 0 });

  const post = postData?.data

  if (!post || !post.user) return <></>;

  return (
    <main className="grid gap-4">
      <BackPost />

      <Post post={post} user={user} />

      {user && <CreatePost parentId={post.id} />}

      {postData.data.children.map(post => (
        <Fragment key={post.id}>
          {post.user && <Post post={post} user={user} />}
        </Fragment>
      ))}
    </main>
  )
}