import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ProjectCard } from "@/components/dashboard/project-card"

export default function ProjectsPage() {
  // Projetos de exemplo
  const projects = [
    {
      id: "1",
      title: "E-commerce App",
      description: "Um aplicativo de comércio eletrônico completo com carrinho de compras e pagamentos.",
      image: "/placeholder.svg?height=100&width=200",
      tags: ["React", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/username/ecommerce-app",
      demoUrl: "https://ecommerce-app.example.com",
    },
    {
      id: "2",
      title: "Blog Pessoal",
      description: "Um blog pessoal com sistema de gerenciamento de conteúdo.",
      image: "/placeholder.svg?height=100&width=200",
      tags: ["Next.js", "Tailwind CSS", "Prisma"],
      githubUrl: "https://github.com/username/personal-blog",
      demoUrl: "https://blog.example.com",
    },
    {
      id: "3",
      title: "App de Finanças",
      description: "Um aplicativo para controle de finanças pessoais.",
      image: "/placeholder.svg?height=100&width=200",
      tags: ["React Native", "Firebase", "Redux"],
      githubUrl: "https://github.com/username/finance-app",
      demoUrl: "https://finance-app.example.com",
    },
    {
      id: "4",
      title: "Dashboard Admin",
      description: "Um painel administrativo para gerenciamento de usuários e conteúdo.",
      image: "/placeholder.svg?height=100&width=200",
      tags: ["Vue.js", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/username/admin-dashboard",
      demoUrl: "https://admin.example.com",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projetos</h2>
          <p className="text-muted-foreground">Gerencie os projetos que serão exibidos em seu portfólio.</p>
        </div>
        <Link href="/dashboard/projetos/novo">
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> Novo Projeto
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

