import { Post } from "@/components/post";
import { TabLayout } from "@/components/common/tab-layout";
import { CreatePost } from "@/components/post/create-post";

import { getUserById } from "@/actions/users/get";
import { getPostsByUser } from "@/actions/posts/get";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0

export default async function Home() {
  const userId = cookies().get("auth_token")?.value ?? "";

  const user = await getUserById(userId);
  const posts = await getPostsByUser(userId);

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

      {posts.map(post => <Post key={post.id} post={post} user={user} />)}
    </>
  );
}
