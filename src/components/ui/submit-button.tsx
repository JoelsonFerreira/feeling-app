'use client'
 
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'

import type { ComponentProps } from 'react'
import { Spinner } from './spinner'
 
export function SubmitButton(props: ComponentProps<typeof Button>) {
  const { pending } = useFormStatus()
 
  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? <Spinner /> : <>{props.children}</>}
    </Button>
  )
}