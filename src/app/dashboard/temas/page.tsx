import { ThemeCard } from "@/components/dashboard/theme-card"

export default function ThemesPage() {
  // Temas de exemplo
  const themes = [
    {
      id: "1",
      name: "Minimalista",
      description: "Um tema limpo e minimalista com foco no conteúdo.",
      preview: "/placeholder.svg?height=200&width=300",
      isActive: true,
    },
    {
      id: "2",
      name: "Moderno",
      description: "Um tema moderno com elementos visuais arrojados e animações suaves.",
      preview: "/placeholder.svg?height=200&width=300",
      isActive: false,
    },
    {
      id: "3",
      name: "Corporativo",
      description: "Um tema profissional ideal para desenvolvedores e empresas.",
      preview: "/placeholder.svg?height=200&width=300",
      isActive: false,
    },
    {
      id: "4",
      name: "Criativo",
      description: "Um tema colorido e criativo para designers e artistas.",
      preview: "/placeholder.svg?height=200&width=300",
      isActive: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Temas</h2>
        <p className="text-muted-foreground">Escolha um tema para seu portfólio ou personalize seu próprio tema.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </div>
  )
}

