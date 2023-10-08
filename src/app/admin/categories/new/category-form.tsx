'use client';

import { categorySchema } from "@/validator/schema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

type CategorySchemaType = z.infer<typeof categorySchema>;


export default function CategoryForm() {
  const router = useRouter()

  const { mutate: createCategory, isLoading } = trpc.categoryStore.useMutation({
    onSuccess: () => {
      router.refresh();
      router.push(`/admin/categories`)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const form = useForm<CategorySchemaType>({
    defaultValues: {
      name: '',
      description: ''
    },
    resolver: zodResolver(categorySchema)
  });

  async function onSubmit(values: CategorySchemaType) {
    createCategory(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name <span className='text-sm text-rose-500'>*</span></FormLabel>
              <FormControl>
                <Input  {...field} className='max-w-lg' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripton (optional)</FormLabel>
              <FormControl>
                <Textarea  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center gap-x-2'>
          <Link href='.' className={buttonVariants({ variant: 'outline' })} >
            <ArrowLeft className='mr-2' />
            Back
          </Link>
          <Button type="submit" disabled={isLoading} isLoading={isLoading} >Create a Category</Button>
        </div>
      </form>
    </Form>
  )
}
