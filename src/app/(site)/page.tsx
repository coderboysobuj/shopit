import { db } from "@/lib/db"
import Image from "next/image";
import Link from "next/link";
import { cn } from '@/lib/utils'
import { type Metadata } from "next";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button";
import PaginationBar from "@/components/pagination-bar";

type PageProps = {
  searchParams: {
    page: string
  }
}

export default async function Page({ searchParams: { page = "1" } }: PageProps) {
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await db.product.count();
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0)
  });

  if (!products.length) return <h1>Product not avaiable</h1>

  const featureProduct = products[0]

  return (
    <section>
      {currentPage === 1 && (
        <figure className='flex flex-col  md:flex-row items-center gap-4'>
          <Image src={featureProduct.image} alt={featureProduct.name} width={500} height={500} className='rounded-md shadow-md' />
          <div className='space-y-4'>
            <h1 className='text-2xl font-semibod tracking-tight'>{featureProduct.name}</h1>
            <p className='text-muted-foreground'>{featureProduct.description.slice(0, 300)}...</p>
            <Link href={`/products/${featureProduct.id}`} className={buttonVariants()}>Cheak It Out</Link>
          </div>
        </figure>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {(currentPage === 1 ? products.splice(1) : products).map((product) => (
          <Card className='rounded-lg overflow-hidden relative h-fit shadow-xl border-none' key={product.id}>
            <Link href={`/products/${product.id}`}>
              <Image src={product.image} priority alt={product.name} height={200} width={350} />
            </Link>
            <CardHeader>

              <Link href={`/products/${product.id}`}>
                <CardTitle>{product.name}</CardTitle>
              </Link>
              {Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7 ? (
                <span className="bg-yellow-300 px-1 w-fit rounded-full text-sm">New</span>
              ) : null}
              <CardDescription>{product.description.slice(0, 200)}...</CardDescription>
            </CardHeader>
            <CardFooter className='flex justify-between'>
              <p className='text-lg font-semibold'>${product.price.toFixed(2)}</p>
              <Link href={`/products/${product.id}`} className={cn(buttonVariants({ size: 'sm' }))}>Add to cart</Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {totalItemCount > pageSize ? (
        <div className='my-5 flex justify-center w-full'>
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        </div>
      ) : null}
    </section>
  )
}
