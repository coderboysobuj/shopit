import Image from "next/image";
import PageHeading from "@/components/admin/page-heading";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoreHorizontal, PlusIcon } from "lucide-react";
import { db } from "@/lib/db";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import PaginationBar from "@/components/pagination-bar";

type PageProps = {
  searchParams: {
    page: string
  }
}

export default async function ProductsPage({ searchParams: { page = '1' } }: PageProps) {

  const currentPage = parseInt(page);
  const pageSize = 10;

  const totalItemCount = await db.product.count();
  const totalPages = Math.ceil(totalItemCount / pageSize);
  const products = await db.product.findMany({
    include: {
      category: {
        select: {
          id: true,
          name: true
        }
      }
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
      <PageHeading title="Products" description="Manage you products" toolbar={
        <Link className={buttonVariants()} href="/admin/products/new">
          <PlusIcon className='h-4 w-4 mr-2' />
          Create a Product
        </Link>
      }
      />

      {products.length < 1 ? (

        <div className="flex flex-col items-center justify-center">
          <h5 className='text-muted-foreground text-2xl'>No product in database</h5>
        </div>
      ) : (

        <Table>
          <TableCaption>A list of products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>

                  <HoverCard>
                    <HoverCardTrigger>
                      <Image src={product.image} alt="Product Image" height={50} width={50} />
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <Image src={product.image} alt="Product Image" height={500} width={500} />
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{product.price.toString()}</TableCell>
                <TableCell>
                  <Button variant='ghost' size="icon">
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {totalItemCount > pageSize ? (
        <div className="flex items-center justify-center">
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        </div>
      ) : null}
    </div>
  )
}
