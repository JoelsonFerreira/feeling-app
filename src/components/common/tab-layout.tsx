import Link from "next/link";

import type { ButtonHTMLAttributes } from "react";

export type TabProps = {
  label: string,
  active?: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>

export type TabLayoutProps = {
  tabs: TabProps[]
}

function Tab({ label, active, ...props }: TabProps) {
  return (
    <button className={`w-full font-medium transition-colors hover:bg-[rgba(231,_233,_234,_0.1)] ${active ? "" : "text-[rgb(113,_118,_123)]"}`} {...props}>
      <span className={`inline-block py-4 ${active ? "relative after:bg-[rgb(29,_155,_240)] after:w-full after:h-1 after:absolute after:bottom-0 after:left-0 after:rounded-full" : ""}`}>
        {label}
      </span>
    </button>
  )
}

export function TabLayout({ tabs }: TabLayoutProps) {
  return (
    <header className="flex items-center justify-around sticky top-0 bg-[rgba(0,_0,_0,_0.65)] backdrop-blur-md border-b border-[#2F3336]">
      {tabs.map((tab, idx) => <Tab key={idx} {...tab} />)}
    </header>
  );
}