import { getSession } from "@/lib/actions/auth-actions"
import { getProjects } from "@/lib/actions/project-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ExternalLink } from "lucide-react"
import Link from "next/link"
import { ProjectCard } from "@/components/dashboard/project-card"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    return null // This should be handled by the layout
  }

  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome, {session.user.name}</h2>
          <p className="text-muted-foreground">Manage your projects and customize your professional portfolio.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/projects/new">
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> New Project
            </Button>
          </Link>
          <Link href="/my-portfolio" target="_blank">
            <Button variant="outline" className="gap-1">
              <ExternalLink className="h-4 w-4" /> View Portfolio
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Projects</CardTitle>
            <CardDescription>Total projects in your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Views</CardTitle>
            <CardDescription>Total views in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>GitHub Repositories</CardTitle>
            <CardDescription>Repositories connected to your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Projects</h3>
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
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
    </div>
  )
}

