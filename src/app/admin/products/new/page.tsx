import PageHeading from "@/components/admin/page-heading";
import { db } from "@/lib/db"
import ProductForm from "./product-form";

export default async function NewProductPage() {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
      <PageHeading title="New Product" description="Create a new product" />
      <ProductForm categories={categories} />
    </div>
  )
}
