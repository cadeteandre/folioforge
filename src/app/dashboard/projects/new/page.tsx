import { ProjectForm } from "@/components/dashboard/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">New Project</h2>
        <p className="text-muted-foreground">Add a new project to your portfolio.</p>
      </div>

      <ProjectForm />
    </div>
  )
}

