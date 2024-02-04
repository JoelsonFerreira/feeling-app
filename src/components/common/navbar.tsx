"use client"

import Link from "next/link";

import { BellIcon, HomeIcon, MessageCircle, SettingsIcon, TvIcon, UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ThemeToggle } from "@/components/common/toggle-theme";
import { Logout } from "@/components/logout-button";
import { useChat } from "@/contexts/server-context";

const navLinks = [
  {
    icon: <HomeIcon />,
    label: "Home",
    href: "/",
  },
  {
    icon: <BellIcon />,
    label: "Notifications",
    href: "/notification",
  },
  {
    icon: <MessageCircle />,
    label: "Messages",
    href: "/messages",
  },
  {
    icon: <UserIcon />,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: <SettingsIcon />,
    label: "Settings",
    href: "/settings",
  },
]

export function Navbar() {
  const { user } = useChat()

  return (
    <nav className="flex justify-between border-t w-full bg-background gap-6 content-start lg:border-none lg:flex lg:flex-col lg:justify-between lg:bottom-[unset] lg:sticky lg:top-0 lg:h-svh lg:p-4 lg:pr-0">
      <div>
        <Link href={"/"} className="hidden lg:flex gap-2 items-end">
          <TvIcon size={42} />
          <h1 className="text-2xl font-medium leading-none">FeelingApp</h1>
        </Link>

        <ul className="p-4 lg:p-0 lg:my-8 flex justify-evenly border-t w-full bg-background gap-6 content-start fixed z-10 bottom-0 lg:border-none lg:grid lg:place-content-start lg:bottom-[unset] lg:sticky lg:top-0">
          {navLinks.map(({
            icon,
            label,
            href,
          }, idx) => (
            <Link key={idx} href={href} className="flex items-center gap-2 hover:underline">
              {icon}
              {label && label.trim().length > 0 && <span className="hidden lg:inline">{label}</span>}
            </Link>
          ))}
        </ul>
        <ThemeToggle />
      </div>

      {user && <div className="hidden lg:flex items-center gap-2">
        <Avatar>
          <AvatarImage alt="" src={user.avatar ?? ""} />
          <AvatarFallback>
            {user.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span>{user.name}</span>
          <Logout />
        </div>
      </div>}
    </nav>
  );
}