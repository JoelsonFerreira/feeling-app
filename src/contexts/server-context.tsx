"use client"

import { type ReactNode, createContext, useContext, useState, useEffect } from "react";
import axios, { type AxiosResponse } from "axios";
import { useQuery, useInfiniteQuery, type FetchNextPageOptions, type InfiniteQueryObserverResult } from "react-query";

import type { Post } from "@/types/post";
import type { User } from "@/types/user";
import { useRouter } from "next/navigation";

type TServerContext = {
  posts: Post[]
  user: User | null
  login: (username: string, password: string) => Promise<unknown>
  logout: () => Promise<unknown>
  register: (id: string, email: string, name: string, password: string) => Promise<unknown>
  post: (status: string, parentId?: string) => Promise<unknown>
  fetchMorePosts: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<AxiosResponse<Post[]>, unknown>>
  loadingPosts: boolean
  loadingUser: boolean
  morePosts: {
    postId: string,
    userId: string,
    avatar?: string | null
  }[]
  fetchMore: (scrollElementSelector: string) => void
}

const ServerContext = createContext<TServerContext | null>(null)

export const api = axios.create({
  baseURL: `http://localhost:8080`,
  withCredentials: true,
})

export function ServerProvider({ children }: { children?: ReactNode }) {
  const [morePosts, setMorePosts] = useState<{
    postId: string,
    userId: string,
    avatar?: string | null
  }[]>([])
  const { refresh, push } = useRouter()

  const { data: postsData, fetchNextPage, isLoading: loadingPosts, refetch } = useInfiniteQuery<AxiosResponse<Post[]>>(
    "posts",
    (page) => api.get(`/posts?page=${page.pageParam ?? 0}`),
    {
      retry: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length
        return nextPage
      }
    }
  );
  const { data: userData, isLoading: loadingUser } = useQuery<AxiosResponse<User>>(`user`, () => api.get('/auth/user'), { retry: 0 });

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080`);

    ws.onopen = () => console.log('[server] connected');
    ws.onclose = () => console.log('[server] disconnected');
    ws.onmessage = (event: { data: string }) => {
      const messageData = JSON.parse(event.data);    

      switch (messageData.event) {
        case 'post':
          setMorePosts(prev => [...prev, messageData.data])
          return;

        case 'notification':
          if(messageData.data.type === "reply") {
            alert(`New notification! ${messageData.data.userId} reply your post.`)
            push(`/post/${messageData.data.postId}`)
          }
          return;
      }
    };

    return () => { ws.close(); };
  }, [push])

  const login = (username: string, password: string) => {
    return api.post("/auth/login", {
      username,
      password
    });
  }

  const register = (
    id: string,
    email: string,
    name: string,
    password: string,
  ) => {
    return api.post("/auth/register", {
      id,
      email,
      name,
      password,
    });
  }

  const logout = () => {
    return api.post("/auth/logout");
  }

  const post = async (status: string, parentId?: string) => {
    const post = await api.post("/posts", {
      status,
      parentId: parentId && parentId.trim().length > 0 ? parentId : null
    })

    refetch();

    return post;
  }

  const allPosts = postsData?.pages.reduce((result, page) => [...result, ...page.data], [] as Post[]) ?? []

  return (
    <ServerContext.Provider
      value={{
        posts: allPosts,
        user: userData?.data ?? null,
        login,
        register,
        logout,
        post,
        fetchMorePosts: fetchNextPage,
        loadingPosts,
        loadingUser,
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