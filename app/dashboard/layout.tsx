import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh grid grid-cols-1 md:grid-cols-[260px_1fr]">
      <Sidebar />
      <div className="min-h-dvh">
        <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
      </div>
    </div>
  )
}
