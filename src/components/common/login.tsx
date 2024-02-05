"use client"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth } from "@/contexts/auth-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export function Login({ setStep }: { setStep: (step: "login" | "register") => void }) {
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  const loading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const username = values.username
    const password = values.password

    await login(username, password)
  }

  return (
    <Form {...form}>
      <form className="flex flex-col items-center gap-6 rounded-2xl max-w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Entrar no Feeling APP</DialogTitle>
          <DialogDescription>
            Faça login para ver as principais notícias do momento
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Nome de usuário" id="username" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" id="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <span className="text-sm text-center">
            Não tem uma conta?
            <Button
              className="pl-2"
              type="submit"
              variant={"link"}
              onClick={() => setStep("register")}
            >
              Inscreva-se
            </Button>
          </span>
        </div>
        <DialogFooter className="w-full">
          <Button type="submit" aria-disabled={loading} className="w-full">
            {loading ? <Spinner /> : <>Login</>}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}