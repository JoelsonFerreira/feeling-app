import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="bg-[rgb(29,_155,_240)] py-2 px-4 rounded-full transition-colors hover:bg-[rgb(26,_142,_219)] font-bold text-sm" {...props} />
  )
}

export function ButtonIcon({ label, icon, ...props }: { label?: string, icon?: JSX.Element } & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`${props.className} flex items-center gap-1 transition-colors hover:text-[#1d9bf0] group`}>
      <span className="relative flex items-center justify-center">
        <span className="absolute scale-150 w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors group-hover:bg-[#1d9bf033]" />
        {icon}
      </span>
      {label}
    </button>
  );
}