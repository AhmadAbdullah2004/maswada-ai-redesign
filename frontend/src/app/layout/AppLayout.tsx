import { Outlet } from "react-router-dom"

import { Footer } from "@/app/layout/Footer"
import { Header } from "@/app/layout/Header"
import useLang from "@/hooks/useLang"
import { Toaster } from "sonner"


export function AppLayout() {
  const { RTL } = useLang()

  return (
    
    <div dir={RTL ? "rtl" : "ltr"} className="flex min-h-screen flex-col bg-background text-foreground">
     <Header />
     {/* * Sets the global toast style and position; messages are triggered elsewhere.*/}
     <Toaster
  position="top-center"
  richColors
  closeButton
  toastOptions={{
    classNames: {
      toast:
        "!w-[min(24rem,calc(100vw-2rem))] !max-w-[calc(100vw-2rem)] !rounded-2xl !border !border-zinc-200 !bg-white !text-zinc-900 !shadow-lg !px-4 !py-3",
      title: "!font-semibold !text-sm !text-zinc-900",
      description: "!text-sm !text-zinc-500",
    },
  }}
/>
      <main className="mx-auto w-full min-w-0 max-w-6xl flex-1 px-3 pb-16 pt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
   
    </div>
    
  )
}
