"use client"

import { useRouter } from "next/navigation";
import { type ReactNode, createContext, useContext, useState } from "react";
import { type AxiosResponse } from "axios";
import { useInfiniteQuery, type FetchNextPageOptions, type InfiniteQueryObserverResult, type QueryFunctionContext, type QueryKey, useMutation } from "react-query";

import { api } from "@/lib/api";
import { useWebSocket } from "@/hooks/useWebSocket";

import type { Post } from "@/types/post";
import type { NotificationEventData, PostEventData } from "@/types/events";
import { queryClient } from "./query-provider";

type TServerContext = {
  posts: Post[]
  post: (status: string, parentId?: string) => Promise<unknown>
  like: (status: string, parentId?: string) => Promise<unknown>
  fetchMorePosts: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<AxiosResponse<Post[]>, unknown>>
  loadingPosts: boolean
  morePosts: PostEventData[]
  fetchMore: (scrollElementSelector: string) => void
}

const ServerContext = createContext<TServerContext | null>(null)

type CreatePostMutation = {
  status: string, 
  parentId: string | null
}

type LikePostMutation = {
  postId: string, 
}

const serverRoutes = {
  getPosts: (page: QueryFunctionContext<QueryKey>) => api.get<Post[]>(`/posts?page=${page.pageParam ?? 0}`),
  createPost: (data: CreatePostMutation) => api.post<Post>("/posts", data),
  likePost: (data: LikePostMutation) => api.post("/posts/like", data)
}

export function ServerProvider({ children }: { children?: ReactNode }) {
  const [morePosts, setMorePosts] = useState<PostEventData[]>([])
  const { refresh, push } = useRouter()

  const {
    data: postsData,
    fetchNextPage,
    isLoading: loadingPosts,
    refetch
  } = useInfiniteQuery<AxiosResponse<Post[]>>(
    "posts",
    serverRoutes.getPosts,
    {
      retry: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length
        return nextPage
      }
    }
  );
  const { mutateAsync: postMutation } = useMutation({ mutationFn: serverRoutes.createPost })
  const { mutateAsync: likeMutation } = useMutation({ mutationFn: serverRoutes.likePost })

  useWebSocket([
    { event: "post", callback: (data: PostEventData) => setMorePosts(prev => [...prev, data]) },
    {
      event: "notification", callback: (data: NotificationEventData) => {
        if (data.type === "reply") {
          alert(`New notification! ${data.userId} reply your post.`)
          push(`/post/${data.postId}`)
        }
      }
    }
  ])

  const post = async (status: string, parentId?: string) => {
    const { data } = await postMutation({
      status,
      parentId: parentId && parentId.trim().length > 0 ? parentId : null
    })
    
    // queryClient.setQueryData(['posts'], (old) => {
    //   console.log(">>>>", old);      

    //   // return old ? [...old, data] : [data]
    //   return { ...old, pages:  }
    // })

    refetch();

    return data;
  }

  const like = async (postId: string) => {
    const { data } = await likeMutation({ postId })

    refetch();

    return data;
  }

  const allPosts = postsData?.pages.reduce((result, page) => [...result, ...page.data], [] as Post[]) ?? []

  return (
    <ServerContext.Provider
      value={{
        posts: allPosts,
        post,
        like,
        fetchMorePosts: fetchNextPage,
        loadingPosts,
        morePosts: morePosts.filter(post => !allPosts.some(p => p.id === post.postId)),
        fetchMore: (scrollElementSelector: string) => {
          const element = document.querySelector(scrollElementSelector)
          element?.scroll({ top: 0, behavior: "smooth" })
          refresh()
          setMorePosts([]);
        }
      }}
    >
      {children}
    </ServerContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ServerContext)

  if (!context) throw new Error("'useChat' hook should be used inside a 'ServerProvider' component.")

  return context
}