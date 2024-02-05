"use client"
import { Fragment } from "react"
import { useQuery } from "react-query"
import type { AxiosResponse } from "axios"

import { Post } from "@/components/post"
import { BackPost } from "@/components/post/back-post"
import { CreatePost } from "@/components/post/create-post"

import type { Post as TPost } from "@/types/post"
import { useAuth } from "@/contexts/auth-context"
import { api } from "@/lib/api"

type PostPageProps = {
  params: {
    postId: string
  }
}

export default function PostPage({ params: { postId } }: PostPageProps) {
  const { user } = useAuth()
  const { data: postData } = useQuery<AxiosResponse<TPost>>(`user`, () => api.get(`/posts/${postId}`), { retry: 0 });

  const post = postData?.data

  if (!post || !post.user) return <></>;

  return (
    <main className="grid gap-4">
      <BackPost />

      <Post post={post} />

      {user && <CreatePost parentId={post.id} />}

      {postData.data.children.map(post => (
        <Fragment key={post.id}>
          {post.user && <Post post={post} />}
        </Fragment>
      ))}
    </main>
  )
}