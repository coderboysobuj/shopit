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
import { trpc } from '@/app/_trpc/client'
import toast from 'react-hot-toast'
import { signUpSchema } from '@/validator/schema'
import { useRouter } from 'next/navigation'



type FormSchemaType = z.infer<typeof signUpSchema>;


export default function SignUpPage() {
  const router = useRouter()
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const { mutate: signUp, isLoading } = trpc.signUp.useMutation({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: async () => {
      toast.success("You account has been created")
      router.replace('/auth/sign-in')
    }
  })
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  function onSubmit(values: FormSchemaType) {
    signUp(values)
  }
  return (
    <div className="lg:p-8 mt-10">
      <div className="mx-auto px-8 sm:px-0 flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter you name" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder="Enter you valid email" {...field} />
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
            <Button>
              {isLoading || authLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {authLoading ? "Redirecting..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>{" "}
        </p>
      </div>
    </div >
  )
}
