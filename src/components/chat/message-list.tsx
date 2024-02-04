"use client"

import { Message } from "./message"
import { User } from "@/types/user"

export function MessageList() {
  const messages: {
    user: User,
    messages: {
      text: string;
      sended: boolean;
      time: Date
    }[]
  }[] = []

  return (
    <section className="flex flex-col gap-2">
      {messages
        .map(({ user, messages }, idx) => (
          user !== user &&
          <Message
            key={idx}
            author={user.id}
            message={messages[messages.length - 1]}
          />
        ))
      }
    </section>
  )
}