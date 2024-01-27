"use client"

import { useRouter } from "next/navigation";

import { ButtonIcon } from "@/components/ui/button";

export function BackPost() {
  const { back } = useRouter()

  return (
    <header className="flex items-center p-4 gap-4">
      <ButtonIcon
        onClick={back}
        icon={(
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width={20} height={20}>
            <g>
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z">
              </path>
            </g>
          </svg>
        )}
      />
      <span>Post</span>
    </header>
  )
}