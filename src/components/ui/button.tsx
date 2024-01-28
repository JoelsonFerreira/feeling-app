import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="bg-[rgb(29,_155,_240)] py-2 px-4 rounded-full transition-colors hover:bg-[rgb(26,_142,_219)] font-bold text-sm" {...props} />
  )
}

const colors = {
  "blue": {
    active: "text-[rgb(29,155,240)]",
    text: "hover:text-[rgb(29,155,240)]",
    bg: "group-hover:bg-[rgba(29,155,240,0.1)]"
  },
  "red": {
    active: "text-[rgb(249,24,128)]",
    text: "hover:text-[rgb(249,24,128)]",
    bg: "group-hover:bg-[rgba(249,24,128,0.1)]"
  },
  "green": {
    active: "text-[rgb(0,186,124)]",
    text: "hover:text-[rgb(0,186,124)]",
    bg: "group-hover:bg-[rgba(0,186,124,0.1)]"
  },
}

export function ButtonIcon({ label, icon, color, active, ...props }: { active?: boolean, label?: string, icon?: JSX.Element, color?: keyof typeof colors } & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`${props.className} flex items-center gap-1 transition-colors group ${color ? colors[color].text : ""} ${active && color ? colors[color].active : ""}`}>
      <span className="relative flex items-center justify-center">
        <span className={`absolute scale-150 w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors ${color ? colors[color].bg : ""}`} />
        {icon}
      </span>
      {label}
    </button>
  );
}