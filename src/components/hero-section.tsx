import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Create your professional portfolio in minutes
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Showcase your projects, integrate with GitHub, and customize your portfolio with exclusive themes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/signup">
              <Button size="lg" className="gap-1">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com/folioforge/demo" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-1">
                <Github className="h-4 w-4" /> View on GitHub
              </Button>
            </Link>
          </div>
          <div className="w-full max-w-3xl overflow-hidden rounded-lg border bg-background shadow-xl mt-8">
            <div className="relative aspect-video overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-700 opacity-90">
                <div className="p-8 text-white">
                  <div className="mb-4 h-6 w-24 rounded-md bg-white/20"></div>
                  <div className="mb-2 h-4 w-full rounded-md bg-white/20"></div>
                  <div className="mb-2 h-4 w-full rounded-md bg-white/20"></div>
                  <div className="mb-6 h-4 w-2/3 rounded-md bg-white/20"></div>
                  <div className="flex gap-2">
                    <div className="h-8 w-20 rounded-md bg-white/20"></div>
                    <div className="h-8 w-20 rounded-md bg-white/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

