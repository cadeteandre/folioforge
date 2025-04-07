import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ArrowLeft, Plus } from "lucide-react"
import { getSession } from "@/lib/actions/auth-actions"
import { getProjects } from "@/lib/actions/project-actions"
import { redirect } from "next/navigation"

export default async function PortfolioPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const projects = await getProjects()
  const user = session.user

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                  <Image
                    src={user.avatar || "/placeholder.svg?height=200&width=200"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-primary">{user.title || "Professional"}</p>
                <p className="text-muted-foreground mt-2">{user.bio || "No bio provided yet."}</p>

                <div className="flex gap-2 mt-4">
                  {user.github && (
                    <Button variant="outline" size="icon" asChild>
                      <Link href={user.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                  )}
                  {user.linkedin && (
                    <Button variant="outline" size="icon" asChild>
                      <Link href={user.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`mailto:${user.email}`}>
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Email</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">My Projects</h2>
              {projects.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <Image
                          src={project.image || "/placeholder.svg?height=200&width=400"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          {project.githubUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-3.5 w-3.5 mr-1" /> GitHub
                              </Link>
                            </Button>
                          )}
                          {project.demoUrl && (
                            <Button size="sm" asChild>
                              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                Demo
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
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
        </div>
      </div>
    </div>
  )
}

