import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { getAuthSesssion } from "@/lib/auth";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getAuthSesssion();
  if (session?.user) {
    if (session.user.role === 'ADMIN') {
      return redirect('/dashboard')
    }
    return redirect('/')
  }
  return (
    <main>
      {children}
    </main>
  )
}
