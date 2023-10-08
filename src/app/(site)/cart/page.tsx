import Link from "next/link";
import PageHeading from "@/components/admin/page-heading";
import { getCart } from "@/lib/cart"
import CartItem from "./cart-item";
import { buttonVariants } from "@/components/ui/button";
import { setProductQuantity } from "./actions";

export default async function CartPage() {
  const cart = await getCart();
  return (
    <div>
      <PageHeading title="Shopping Cart" description="Manage you shopping cart" />
      <ul className='space-y-4 mt-5'>
        {!cart ? (
          <div className="mt-4">
            <Link href='/' className={buttonVariants()}>Go to shopping</Link>
          </div>
        ) : cart?.items?.map(item => (
          <CartItem key={item.id} item={item} setProductQuantity={setProductQuantity} />
        ))}
      </ul>
      {cart ? (
        <div className='mt-5 space-y-2'>
          <h5 className='text-xl font-semibold'>Total: ${cart?.subtotal?.toFixed(2) || 0}</h5>
          <Link href='/' className={buttonVariants({ variant: 'outline' })}>Go to shopping</Link>
          <Link href='/checkout' className={buttonVariants()}>Checkout</Link>
        </div>
      ) : null}
    </div>
  )
}

