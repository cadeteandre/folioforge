"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FolderKanban, Github, Palette, Settings, ExternalLink } from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: FolderKanban,
    },
    {
      name: "GitHub Integration",
      href: "/dashboard/github",
      icon: Github,
    },
    {
      name: "Themes",
      href: "/dashboard/themes",
      icon: Palette,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <>
      <input type="checkbox" id="sidebar-mobile-toggle" className="peer hidden" />
      <aside className="fixed top-16 bottom-0 z-30 -translate-x-full border-r bg-background peer-checked:translate-x-0 md:w-64 md:translate-x-0 transition-transform duration-300 md:transition-none">
        <div className="flex h-full flex-col gap-2 p-4">
          <nav className="grid gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Link
              href="/my-portfolio"
              target="_blank"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10"
            >
              <ExternalLink className="h-4 w-4" />
              View my portfolio
            </Link>
          </div>
        </div>
      </aside>
      <div className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm peer-checked:block md:hidden hidden"></div>
    </>
  )
}

