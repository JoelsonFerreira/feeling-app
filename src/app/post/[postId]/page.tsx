import { cookies } from "next/headers"

import { Fragment } from "react"

import { getPost, getPostReplies } from "@/actions/posts/get"
import { getUserById } from "@/actions/users/get"

import { Post } from "@/components/post"
import { BackPost } from "@/components/post/back-post"
import { CreatePost } from "@/components/post/create-post"


type PostPageProps = {
  params: {
    postId: string
  }
}

export default async function PostPage({ params: { postId } }: PostPageProps) {
  const userId = cookies().get("auth_token")?.value ?? "";

  const user = await getUserById(userId);
  const post = await getPost(postId, userId);
  const replies = await getPostReplies(postId, userId);

  if (!post || !post.user) return <></>;

  return (
    <div>
      <BackPost />

      <Post post={post} />

      {user && <CreatePost user={user} parentPostId={post.id} />}

      {replies.map(post => (
        <Fragment key={post.id}>
          {post.user && <Post post={post} />}
        </Fragment>
      ))}
    </div>
  )
}