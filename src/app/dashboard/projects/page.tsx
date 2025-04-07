import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ProjectCard } from "@/components/dashboard/project-card"
import { getProjects } from "@/lib/actions/project-actions"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Manage the projects that will be displayed in your portfolio.</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> New Project
          </Button>
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border rounded-lg bg-muted/40">
          <p className="text-muted-foreground">You haven't created any projects yet.</p>
          <Link href="/dashboard/projects/new" className="mt-4 inline-block">
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Create your first project
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

