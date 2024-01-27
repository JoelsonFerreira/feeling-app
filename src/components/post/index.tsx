import Image from "next/image";
import Link from "next/link";

import { CommentIcon } from "@/icons/comment";
import { ShareIcon } from "@/icons/share";
import { LikeIcon } from "@/icons/like";
import { ViewIcon } from "@/icons/view";

import { ButtonIcon } from "@/components/ui/button";

import type { Post, User } from "@prisma/client";
import { likePost } from "@/actions/posts/like";
import { Avatar } from "../ui/avatar";

function abbrNum(number: number, decPlaces: number) {
  let _number = number
  let _decPlaces = decPlaces

  _decPlaces = Math.pow(10, _decPlaces);

  const abbrev = ["k", "m", "b", "t"];

  for (var i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);

    if (size <= _number) {
      _number = Math.round(_number * _decPlaces / size) / _decPlaces;

      if ((_number == 1000) && (i < abbrev.length - 1)) {
        _number = 1;
        i++;
      }

      return `${_number}${abbrev[i]}`
    }
  }

  return `${_number}`;
}

function PostFooter({ post }: { post: Post }) {
  return (
    <footer className="flex justify-between items-center mt-3 text-[#666666]">
      <ButtonIcon icon={<CommentIcon />} label={abbrNum(post.comments, 2)} />
      <ButtonIcon icon={<ShareIcon />} label={abbrNum(post.shares, 2)} />
      <form action={likePost}>
        <input type="hidden" name="postId" value={post.id} />
        <ButtonIcon icon={<LikeIcon />} label={abbrNum(post.likes, 2)} />
      </form>
      <ButtonIcon icon={<ViewIcon />} label={abbrNum(post.views, 2)} />
    </footer>
  )
}

function PostContent({ post }: { post: Post }) {
  return (
    <main className="text-[#e9e7ea] text-sm mt-2">
      <span>{post.status}</span>
      {/* <div>
        {post.media.map((item, idx) =>
          <Image
            key={idx}
            className="rounded-2xl mt-3"
            alt=""
            src="https://pbs.twimg.com/media/GEtHzn7XEAAlxSh?format=jpg&name=small"
            width={512}
            height={512}
          />
        )}
      </div> */}
    </main>
  )
}

export function Post({ post, user }: { post: Post, user: User }) {
  return (
    <section className="border-y border-[#2F3336] p-4 flex gap-3 justify-start items-start">
      <Avatar alt="" src={user.avatar ?? ""} />
      <article className="w-full flex flex-col">
        <header className="flex items-center gap-1">
          <Link href="/" className="font-semibold hover:underline leading-none">{user.name}</Link>
          <span className="text-sm text-[rgb(113,_118,_123)] leading-none">@{user.id}</span>
        </header>
        <PostContent post={post} />
        <PostFooter post={post} />
      </article>
    </section>
  )
}