import Link from "next/link";

import { CommentIcon } from "@/icons/comment";
import { ShareIcon } from "@/icons/share";
import { ViewIcon } from "@/icons/view";

import { ButtonIcon } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Like } from "@/components/post/like";

import type { TPost } from "@/actions/posts/get-all";

import { abbrNum, timeSince } from "@/lib/utils";

import type { User } from "@prisma/client";

function PostFooter({ post, user }: { post: TPost, user: User | null }) {
  return (
    <footer className="flex justify-between items-center mt-3 text-[#666666]">
      <ButtonIcon color="blue" icon={<CommentIcon />} label={abbrNum(post.comments, 2)} />
      <ButtonIcon color="green" icon={<ShareIcon />} label={abbrNum(post.shares, 2)} />
      <Like post={post} userId={user?.id} />
      <ButtonIcon color="blue" icon={<ViewIcon />} label={abbrNum(post.views, 2)} />
    </footer>
  )
}

function PostContent({ post }: { post: TPost }) {
  return (
    <Link href={`/post/${post.id}`} className="text-[#e9e7ea] text-sm mt-2">
      <span>{post.status}</span>
    </Link>
  )
}

export function Post({ post, user }: { post: TPost, user: User | null }) {
  return (
    <section className="border-b border-[#2F3336] p-4 flex gap-3 justify-start items-start">
      <Avatar alt="" src={post.user?.avatar ?? ""} />
      <article className="w-full flex flex-col">
        <header className="flex items-center justify-between gap-1">
          <div className="flex flex-col items-start lg:flex-row lg:items-center gap-1">
            <Link href="/" className="font-semibold hover:underline leading-none">{post.user?.name}</Link>
            <div className="flex items-center">
              <span className="text-sm text-[rgb(113,_118,_123)] leading-none">@{post.user?.id}</span>
              <span className="text-sm text-[rgb(113,_118,_123)] leading-none relative flex items-center pl-1.5 before:left-0 before:absolute before:w-[2px] before:h-[2px] before:bg-[rgb(113,_118,_123)] before:rounded-full">{timeSince(post.createdAt)}</span>
            </div>
          </div>
          <ButtonIcon className="text-[rgb(113,_118,_123)]" icon={(
            <svg viewBox="0 0 24 24" aria-hidden="true" width={18} height={18} fill="currentColor">
              <g>
                <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
                </path>
              </g>
            </svg>
          )} />
        </header>
        <PostContent post={post} />
        <PostFooter post={post} user={user} />
      </article>
    </section>
  )
}