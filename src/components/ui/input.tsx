import type { InputHTMLAttributes } from "react";

export function Input({className, ...props}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${className} bg-black px-2 py-3 rounded border border-[rgb(51,54,57)] focus:border-[rgb(29,155,240)] outline-none`} {...props} />
}