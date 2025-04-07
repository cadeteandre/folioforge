import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/actions/auth-actions"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={session.user} />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8 bg-muted/40">{children}</main>
      </div>
    </div>
  )
}

