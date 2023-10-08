import Image from "next/image"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { type Metadata } from "next"

import { cache } from "react";
import AddToCartButton from "./add-to-cart-button";
import { incrementProductQuantity } from "./actions";

type PageProps = {
  params: {
    id: string
  }
}


const getProduct = cache(async (id: string) => {
  const product = await db.product.findFirst({
    where: {
      id
    }
  });

  if (!product) notFound();

  return product
})
export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + "- ShopIT",
    description: product.description
  }

}

export default async function ProductPage({ params: { id } }: PageProps) {

  const product = await getProduct(id)


  return (
    <article className=''>
      <figure className='flex flex-col gap-2 lg:flex-row items-center'>
        <Image src={product.image} alt={product.name}
          width={500}
          height={500}
          priority
          className="rounded-lg"
        />
        <div className="space-y-4">
          <h1 className='font-semibold text-2xl tracking-tight'>{product.name}</h1>
          <strong>${product.price.toFixed(2)}</strong>
          <p className="text-muted-foreground">{product.description.slice(1, 300)}</p>

          <AddToCartButton incrementProductQuantity={incrementProductQuantity} productId={product.id} />

        </div>
      </figure>
      <p className='mt-4'>{product.description}</p>
    </article>
  )
}
