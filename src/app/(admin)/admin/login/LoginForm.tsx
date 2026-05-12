'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'At least 8 characters'),
})

type Values = z.infer<typeof schema>

export function LoginForm({ className }: { className?: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  function onSubmit(values: Values) {
    startTransition(async () => {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      })
      if (error) {
        toast.error(error.message ?? 'Sign-in failed')
        return
      }
      toast.success('Signed in')
      router.replace('/admin')
      router.refresh()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('grid gap-4', className)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
                <Input type="password" autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending}>
          {pending ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </Form>
  )
}
