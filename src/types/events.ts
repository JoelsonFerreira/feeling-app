export type PostEventData = {
  postId: string,
  userId: string,
  avatar?: string | null
}

export type NotificationEventData = {
  type: string,
  userId: string,
  postId: string,
}
