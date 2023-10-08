import PageHeading from "@/components/admin/page-heading";
import CategoryForm from "./category-form";

export default async function NewProductPage() {

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
      <PageHeading title="New category" description="Create a new category" />
      <CategoryForm />
    </div>
  )
}
