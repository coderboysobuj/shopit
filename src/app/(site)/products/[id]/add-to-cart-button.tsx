'use client'

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useTransition } from "react"
import toast from "react-hot-toast"

type AddToCartButtonProps = {
  productId: string,
  incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCartButton({ productId, incrementProductQuantity }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button isLoading={isPending} onClick={() => {
      startTransition(async () => {
        try {
          await incrementProductQuantity(productId)
          toast.success('Product added to you shopping cart.')
        } catch (error) {
          toast.error('Something went wrong')
        }
      })
    }}>
      <ShoppingCart className='mr-2 h-4 w-4' />
      Add to cart
    </Button>
  )
}


