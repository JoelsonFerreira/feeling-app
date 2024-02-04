"use client"

import { Card } from "@/components/ui/card";
import { Auth } from "@/components/common/auth";
import { MessageList } from "@/components/chat/message-list";

import { useChat } from "@/contexts/server-context";

export default function Messages() {
  const { user } = useChat()

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="grid place-items-center">
      <Card className="w-full h-full max-w-7xl max-h-[60rem] flex">
        <header className="flex items-center gap-2 h-12">
          <strong className="text-gray-800">Hello, {user?.name}</strong>
        </header>

        <MessageList />
        {/* <Chat showBackButton={false} className="h-full flex flex-col" /> */}
      </Card>
    </div>
  );
}
