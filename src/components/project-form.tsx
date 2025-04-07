"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { createProject } from "@/lib/actions/project-actions"
import { Loader2 } from "lucide-react"

export function ProjectForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    formData.append("tags", JSON.stringify(tags))

    try {
      const result = await createProject(formData)

      if (result.success) {
        router.push("/dashboard/projects")
      } else {
        setError(result.error || "An error occurred while creating the project.")
      }
    } catch (error) {
      setError("An error occurred while creating the project. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  function removeTag(tagToRemove: string) {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" name="title" placeholder="Name of your project" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Describe your project" rows={4} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (Press Enter to add)</Label>
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              placeholder="React, TypeScript, etc."
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
            <Input id="githubUrl" name="githubUrl" placeholder="https://github.com/username/repo" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="demoUrl">Demo URL (optional)</Label>
            <Input id="demoUrl" name="demoUrl" placeholder="https://your-project.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Project Image</Label>
            <Input id="image" name="image" type="file" accept="image/*" />
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Project"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

