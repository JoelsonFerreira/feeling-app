"use client"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useChat } from "@/contexts/server-context";

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
  FormLabel 
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export function Register({ setStep }: { setStep: (step: "login" | "register") => void }) {
  const { register } = useChat()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  const loading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const username = values.username
    const name = values.name
    const email = values.email
    const password = values.password

    await register(username, email, name, password)

    window.location.reload();
  }

  return (
    <Form {...form}>
      <form className="flex flex-col items-center gap-6 rounded-2xl max-w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Registre-se no FeelingApp</DialogTitle>
          <DialogDescription>
            Registre=se para ver as principais notícias do momento
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" id="name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" id="email" type="email" {...field} />
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
                  <Input placeholder="Password" id="password" type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <span className="text-sm text-center">
            Já tem uma conta?
            <Button 
              className="pl-2"
              type="button"
              variant={"link"} 
              onClick={() => setStep("login")} 
            >
              Entrar
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