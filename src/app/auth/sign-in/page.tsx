'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Icons } from '@/components/icons'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signInSchema } from '@/validator/schema'



type FormSchemaType = z.infer<typeof signInSchema>;


export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  async function onSubmit(values: FormSchemaType) {
    try {

      setIsLoading(true)
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      });

      if (response?.error) {
        return toast.error(response.error)
      }

      setIsLoading(false)

      router.refresh()
      router.replace('/')

    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="lg:p-8 mt-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login you account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to login your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder="Enter you valid email" {...field} />
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
                    <Input type='password' placeholder="Enter a password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' isLoading={isLoading}>
              Sign In
            </Button>
          </form>
        </Form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Do not have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </Link>{" "}
        </p>
      </div>
    </div>
  )
}
