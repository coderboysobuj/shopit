import PageHeading from "@/components/admin/page-heading";
import { db } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PaginationBar from "@/components/pagination-bar";
import TableAction from "./table-action";
import PageToolbar from "./page-toolbar";
type CategoriesPageProps = {
  searchParams: {
    page: string;
  };
};
export default async function CategoriesPage({
  searchParams: { page = "1" },
}: CategoriesPageProps) {
  const currentPage = parseInt(page);
  const pageSize = 3;

  const totalItemCount = await db.category.count();
  const totalPages = Math.ceil(totalItemCount / pageSize);

  const categories = await db.category.findMany({
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-1 flex-col space-y-8 md:flex">
      <PageHeading
        title="Category"
        description="Manage categories"
        toolbar={<PageToolbar />}
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
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(category.createdAt))}
              </TableCell>
              <TableCell>
                <TableAction category={category} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalItemCount > pageSize ? (
        <div className="flex items-center justify-center w-full">
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        </div>
      ) : null}
    </div>
  );
}
