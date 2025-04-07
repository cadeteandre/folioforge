import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, ExternalLink, Github, Trash2 } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    githubUrl?: string
    demoUrl?: string
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/dashboard/projects/${project.id}/edit`}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
        <div className="flex gap-2">
          {project.githubUrl && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          )}
          {project.demoUrl && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Demo</span>
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

