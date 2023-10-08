import Link from "next/link";
import { UserNav } from "./user-nav";
import { Icons } from "./icons";
import { ShoppingCartIcon } from "lucide-react";
import { ShoppingCart, getCart } from "@/lib/cart";
import { Badge } from './ui/badge'

import { buttonVariants } from "./ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { getAuthSesssion } from "@/lib/auth";

export default async function Header() {
  const cart = await getCart();
  const session = await getAuthSesssion()
  return (
    <header className="border-b shadow fixed top-0 w-full bg-background z-10">
      <div className="max-w-5xl mx-auto flex h-14 items-center px-4">
        <Link
          href="/"
          className="text-sm font-medium flex items-center gap-2"
        >
          <Icons.logo className='h-6 w-6' />
          <h1 className='text-2xl'>ShopIT</h1>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Cart cart={cart} />
          {session?.user ? (
            <UserNav user={session.user} />
          ) : (

            <Link href='/auth/sign-up' className={buttonVariants({
              size: 'sm'
            })}>Get Started</Link>
          )}
        </div>
      </div>
    </header>
  )
}

const Cart = ({ cart }: { cart: ShoppingCart | null }) => {
  "use client"
  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='relative'>
          <ShoppingCartIcon className="cursor-pointer" />
          <Badge className='absolute -right-5 -top-4'>{cart?.size || 0}</Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <h5 className="text-lg font-medium">Items: {cart?.size || 0}</h5>
            <p className="text-sm leading-none text-muted-foreground">
              Subtotal: ${cart?.subtotal?.toFixed(2) || 0}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href='/cart' className={buttonVariants()}>View Cart</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
