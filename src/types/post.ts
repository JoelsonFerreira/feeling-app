import type { User } from "./user"

export type Post = {
  id: string
  parentId: string
  status: string
  shares: number
  createdAt: string
  updatedAt: string
  authorId: string
  comments: number
  likes: number
  views: number
  user: User
  liked: boolean
  children: Post[]
}