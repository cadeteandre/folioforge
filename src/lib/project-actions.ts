"use server"

import { prisma } from "@/lib/db"
import { getSession } from "./auth-actions"
import { revalidatePath } from "next/cache"

type ProjectResult = {
  success: boolean
  error?: string
}

export async function createProject(formData: FormData): Promise<ProjectResult> {
  try {
    const session = await getSession()

    if (!session) {
      return {
        success: false,
        error: "You must be logged in to create a project.",
      }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const tagsJson = formData.get("tags") as string
    const githubUrl = formData.get("githubUrl") as string
    const demoUrl = formData.get("demoUrl") as string

    // Handle image upload (in a real app, you'd upload to a storage service)
    // For now, we'll just use a placeholder
    const image = "/placeholder.svg?height=200&width=400"

    // Basic validation
    if (!title || !description) {
      return {
        success: false,
        error: "Title and description are required.",
      }
    }

    // Parse tags
    let tags: string[] = []
    try {
      tags = JSON.parse(tagsJson)
    } catch (e) {
      tags = []
    }

    // Create project
    await prisma.project.create({
      data: {
        title,
        description,
        tags,
        githubUrl: githubUrl || null,
        demoUrl: demoUrl || null,
        image,
        userId: session.user.id,
      },
    })

    revalidatePath("/dashboard/projects")

    return { success: true }
  } catch (error) {
    console.error("Create project error:", error)
    return {
      success: false,
      error: "An error occurred while creating the project.",
    }
  }
}

export async function updateProject(id: string, formData: FormData): Promise<ProjectResult> {
  try {
    const session = await getSession()

    if (!session) {
      return {
        success: false,
        error: "You must be logged in to update a project.",
      }
    }

    // Check if project exists and belongs to user
    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      return {
        success: false,
        error: "Project not found.",
      }
    }

    if (project.userId !== session.user.id) {
      return {
        success: false,
        error: "You don't have permission to update this project.",
      }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const tagsJson = formData.get("tags") as string
    const githubUrl = formData.get("githubUrl") as string
    const demoUrl = formData.get("demoUrl") as string

    // Basic validation
    if (!title || !description) {
      return {
        success: false,
        error: "Title and description are required.",
      }
    }

    // Parse tags
    let tags: string[] = []
    try {
      tags = JSON.parse(tagsJson)
    } catch (e) {
      tags = []
    }

    // Update project
    await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        tags,
        githubUrl: githubUrl || null,
        demoUrl: demoUrl || null,
      },
    })

    revalidatePath("/dashboard/projects")

    return { success: true }
  } catch (error) {
    console.error("Update project error:", error)
    return {
      success: false,
      error: "An error occurred while updating the project.",
    }
  }
}

export async function deleteProject(id: string): Promise<ProjectResult> {
  try {
    const session = await getSession()

    if (!session) {
      return {
        success: false,
        error: "You must be logged in to delete a project.",
      }
    }

    // Check if project exists and belongs to user
    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      return {
        success: false,
        error: "Project not found.",
      }
    }

    if (project.userId !== session.user.id) {
      return {
        success: false,
        error: "You don't have permission to delete this project.",
      }
    }

    // Delete project
    await prisma.project.delete({
      where: { id },
    })

    revalidatePath("/dashboard/projects")

    return { success: true }
  } catch (error) {
    console.error("Delete project error:", error)
    return {
      success: false,
      error: "An error occurred while deleting the project.",
    }
  }
}

export async function getProjects() {
  try {
    const session = await getSession()

    if (!session) {
      return []
    }

    const projects = await prisma.project.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return projects
  } catch (error) {
    console.error("Get projects error:", error)
    return []
  }
}

