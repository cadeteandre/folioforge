import { Palette, Github, Layout, Zap, Shield, Share2 } from "lucide-react"

export function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful Features</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to create an impressive professional portfolio
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Github className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">GitHub Integration</h3>
            <p className="text-center text-muted-foreground">
              Automatically sync your GitHub repositories and projects.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Customizable Themes</h3>
            <p className="text-center text-muted-foreground">
              Choose from various themes or create your own with custom colors and layouts.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Layout className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Responsive Layouts</h3>
            <p className="text-center text-muted-foreground">
              Your portfolio adapts perfectly to any device, from smartphones to desktops.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Fast and Optimized</h3>
            <p className="text-center text-muted-foreground">
              Built with Next.js to ensure fast loading and optimized SEO.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Advanced Security</h3>
            <p className="text-center text-muted-foreground">
              Data protection and secure authentication for your portfolio.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Easy Sharing</h3>
            <p className="text-center text-muted-foreground">
              Share your portfolio on social networks and professional platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

