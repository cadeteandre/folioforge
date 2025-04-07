import Link from "next/link"
import { Code } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          <span className="font-semibold">FolioForge</span>
        </div>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} FolioForge. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

