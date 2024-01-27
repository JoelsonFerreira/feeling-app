import Link from "next/link";

import { SubmitButton } from "@/components/ui/submit-button";

import { loginUser } from "@/actions/users/login";

export default function Login() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(91,_112,_131,_0.4)]">
      <form className="bg-black flex flex-col gap-6 p-32 rounded-2xl" action={loginUser}>
        <input className="text-black" placeholder="Nome de usuário" name="name" />
        <input className="text-black" placeholder="********" type="password" name="password" />

        <SubmitButton>Avançar</SubmitButton>

        <span>Não tem uma conta? <Link href="/register">Inscreva-se</Link></span>
      </form>
    </div>
  )
}