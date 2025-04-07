import { ThemeCard } from "@/components/dashboard/theme-card"

export default function ThemesPage() {
  // Example themes
  const themes = [
    {
      id: "1",
      name: "Minimalist",
      description: "A clean and minimalist theme with focus on content.",
      preview: "/placeholder.svg?height=200&width=300",
      isActive: true,
    },
    {
      id: "2",
      name: "Modern",
      description: "A modern theme with bold visual elements and smooth animations.",
      preview: "/placeholder.svg?height=200&width=300",
      isActive: false,
    },
    {
      id: "3",
      name: "Corporate",
      description: "A professional theme ideal for developers and companies.",
      preview: "/placeholder.svg?height=200&width=300",
      isActive: false,
    },
    {
      id: "4",
      name: "Creative",
      description: "A colorful and creative theme for designers and artists.",
      preview: "/placeholder.svg?height=200&width=300",
      isActive: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Themes</h2>
        <p className="text-muted-foreground">Choose a theme for your portfolio or customize your own theme.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </div>
  )
}

