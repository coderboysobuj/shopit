import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "../icons"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >


      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
      >
        <Icons.logo className='h-6 w-6' />
        <h1 className="text-2xl">ShopIT</h1>
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/dashboard/customers"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        href="/dashboard/products"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </Link>

      <Link
        href="/dashboard/categories"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Categories
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}
