"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useChat } from "@/contexts/server-context";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";

const formSchema = z.object({
  status: z.string(),
  parentId: z.string().optional(),
})

export function CreatePost({ parentId }: { parentId?: string }) {
  const { post } = useChat()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
    },
  })

  const loading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const status = values.status
    const parentId = values.parentId

    await post(status, parentId)

    form.reset()
  }

  return (
    <Form {...form}>
      <form className="w-full relative p-1" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here."
                  className="resize-none h-max min-h-32 max-h-64 pb-16"
                  id="new-post"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Input type="hidden" name="parentId" value={parentId} />

        <Button type="submit" aria-disabled={loading} className="mt-4 ml-auto block absolute bottom-4 right-4">
          {loading ? <Spinner /> : <>Post</>}
        </Button>
      </form>
    </Form>
  )
}