'use client';

import { Category } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { productSchema } from '@/validator/schema'
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type ProductSchemaType = z.infer<typeof productSchema>;

export default function ProductForm({ categories }: { categories: Category[] }) {

  const router = useRouter()

  const { mutate: createProduct, isLoading } = trpc.productStore.useMutation({
    onSuccess: () => {
      router.refresh();
      router.refresh();
      router.push(`/admin/products`)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const form = useForm<ProductSchemaType>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      categoryId: '',
      image: ''
    },
    resolver: zodResolver(productSchema)
  });

  async function onSubmit(values: ProductSchemaType) {
    createProduct(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category<span className='text-sm text-rose-500'>*</span></FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem value={category.id} key={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name <span className='text-sm text-rose-500'>*</span></FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL <span className='text-sm text-rose-500'>*</span></FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price <span className='text-sm text-rose-500'>*</span></FormLabel>
              <FormControl>
                <Input type='number'  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Descripton</FormLabel>
              <FormControl>
                <Textarea className='min-h-[150px]'  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex col-span-2 items-center gap-x-2'>
          <Link href='.' className={buttonVariants({ variant: 'outline' })} >
            <ArrowLeft className='mr-2' />
            Back
          </Link>
          <Button type="submit" disabled={isLoading} isLoading={isLoading} >Create a Product</Button>
        </div>
      </form>
    </Form>
  )
}
