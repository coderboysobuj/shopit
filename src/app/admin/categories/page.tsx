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
export default async function CategoriesPage() {

  const categories = await db.category.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
      <PageHeading title="Category" description="Manage categories" toolbar={
        <Link className={buttonVariants()} href="/admin/categories/new">
          <PlusIcon className='h-4 w-4 mr-2' />
          Create a Category
        </Link>
      }
      />
      <Table>
        <TableCaption>A list of categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map(category => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.createdAt.toString()}</TableCell>
              <TableCell>
                <Button variant='ghost' size='icon'>
                  <MoreHorizontal />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
