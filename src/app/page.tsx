import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Fragment } from "react";

import { Post } from "@/components/post";
import { TabLayout } from "@/components/common/tab-layout";
import { CreatePost } from "@/components/post/create-post";

import { getUserById } from "@/actions/users/get";
import { getAllPosts } from "@/actions/posts/get-all";

export const revalidate = 0

export default async function Home() {
  const userId = cookies().get("auth_token")?.value ?? "";

  const user = await getUserById(userId);
  const posts = await getAllPosts(userId);

  if(!user) {
    redirect("/login");
  }

  return (
    <>
      <TabLayout 
        tabs={[
          { label: "Para você", active: true },
          { label: "Seguindo" },
        ]} 
      />

      <CreatePost user={user} />

      {posts.map(post => (
        <Fragment key={post.id}>
          {post.user && <Post post={post} />}
        </Fragment>
      ))}
    </>
  );
}
