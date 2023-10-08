import Header from "@/components/header";

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto px-4 mt-14 py-4">
        {children}
      </main>
    </div>
  )
}
