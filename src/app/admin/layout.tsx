import { Search } from "@/components/admin/search-box";
import Sidebar, { SidebarItem } from "@/components/admin/sidebar";
import { UserNav } from "@/components/admin/user-nav";
import { getAuthSesssion } from "@/lib/auth";
import { BarChart3, Boxes, Gift, LayoutDashboard, LifeBuoy, Package, Receipt, Rows, UserCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function DashboarLayout({ children }: PropsWithChildren) {
  const session = await getAuthSesssion();
  if (!session?.user) return redirect(`/auth/sign-in`)
  if (session.user.role !== 'ADMIN') return redirect('/')
  return (
    <div className="flex">
      <Sidebar user={session.user}>
        <SidebarItem href="/admin/dashboard" text="Dashboard" icon={<LayoutDashboard size={20} />} />

        <SidebarItem href="/admin/categories" text="Categories" icon={<Rows size={20} />} />
        <SidebarItem href="/admin/products" text="Products" icon={<Gift size={20} />} />

        <SidebarItem href="/admin/statistics" text="Statistics" icon={<BarChart3 size={20} />} />
        <SidebarItem href="/admin/customers" text="Customers" icon={<UserCircle size={20} />} />
        <SidebarItem href="/admin/inventory" text="Inventory" icon={<Boxes size={20} />} />
        <SidebarItem href="/admin/orders" text="Orders" icon={<Package size={20} />} alert />
        <SidebarItem href="/admin/billings" text="Billings" icon={<Receipt size={20} />} />
        <hr className='my-3' />
        <SidebarItem href="/admin/settings" text="Settings" icon={<Receipt size={20} />} />
        <SidebarItem href="/admin/help" text="Help" icon={<LifeBuoy size={20} />} />
      </Sidebar>
      <div className='h-screen w-full flex flex-col'>
        <header className="border-b">
          <div className="flex h-14 items-center px-4">
            <Search />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>
        <div className="flex-1 h-[calc(100vh-56px)] overflow-y-auto space-y-4 p-8 pt-6">
          {children}
        </div>

      </div>
    </div>
  )
}
