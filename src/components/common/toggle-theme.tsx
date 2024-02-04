"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Switch } from "../ui/switch"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="hidden lg:flex items-center space-x-2">
      <MoonIcon />
      <Switch onCheckedChange={value => {
        setTheme(value ? "light" : "dark")
      }} />
      <SunIcon />
    </div>
  )
}
