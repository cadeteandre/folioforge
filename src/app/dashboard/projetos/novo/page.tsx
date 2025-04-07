import { ProjectForm } from "@/components/dashboard/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Novo Projeto</h2>
        <p className="text-muted-foreground">Adicione um novo projeto ao seu portfólio.</p>
      </div>

      <ProjectForm />
    </div>
  )
}

