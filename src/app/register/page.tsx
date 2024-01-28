import Link from "next/link";

import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";

import { registerUser } from "@/actions/users/register";

export default function Register() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(91,_112,_131,_0.4)]">
      <form className="bg-black flex flex-col items-center gap-6 px-20 py-8 rounded-2xl" action={registerUser}>
        <header>
          <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" width={26} height={26}>
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </g>
          </svg>
        </header>
        <h1 className="w-full text-3xl font-bold">Inscreva-se no X <br />hoje mesmo</h1>

        <Input placeholder="Nome de usuário" name="username" />
        <Input placeholder="Nome completo" name="name" />
        <Input placeholder="Email" name="email" type="email" />
        <Input placeholder="Password" name="password" type="password" />

        <SubmitButton className="w-full">Avançar</SubmitButton>

        <span className="text-[rgb(113,118,123)] text-sm">Já tem uma conta? <Link href="/login" className="text-[rgb(29,155,240)] hover:underline">Entrar</Link></span>
      </form>
    </div>
  )
}