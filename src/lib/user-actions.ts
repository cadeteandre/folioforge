"use server"

import { prisma } from "@/lib/db"
import { getSession } from "./auth-actions"
import { revalidatePath } from "next/cache"

type UserResult = {
  success: boolean
  error?: string
}

export async function updateProfile(formData: FormData): Promise<UserResult> {
  try {
    const session = await getSession()

    if (!session) {
      return {
        success: false,
        error: "You must be logged in to update your profile.",
      }
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const title = formData.get("title") as string
    const bio = formData.get("bio") as string

    // Handle avatar upload (in a real app, you'd upload to a storage service)
    // For now, we'll just use a placeholder or keep the existing avatar
    const avatar = session.user.avatar || "/placeholder.svg?height=200&width=200"

    // Basic validation
    if (!name || !email) {
      return {
        success: false,
        error: "Name and email are required.",
      }
    }

    // Check if email is already in use by another user
    if (email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        return {
          success: false,
          error: "Email already in use.",
        }
      }
    }

    // Update user
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
        title: title || null,
        bio: bio || null,
        avatar,
      },
    })

    revalidatePath("/dashboard/settings")

    return { success: true }
  } catch (error) {
    console.error("Update profile error:", error)
    return {
      success: false,
      error: "An error occurred while updating your profile.",
    }
  }
}

export async function updatePortfolioSettings(formData: FormData): Promise<UserResult> {
  try {
    const session = await getSession()

    if (!session) {
      return {
        success: false,
        error: "You must be logged in to update your portfolio settings.",
      }
    }

    const portfolioUrl = formData.get("portfolioUrl") as string
    const seoTitle = formData.get("seoTitle") as string
    const seoDescription = formData.get("seoDescription") as string
    const isPublic = formData.get("isPublic") === "on"
    const showGithubStats = formData.get("showGithubStats") === "on"
    const showContactForm = formData.get("showContactForm") === "on"

    // Basic validation
    if (!portfolioUrl) {
      return {
        success: false,
        error: "Custom URL is required.",
      }
    }

    // Check if portfolio URL is already in use by another user
    const existingSettings = await prisma.settings.findUnique({
      where: { portfolioUrl },
      include: { user: true },
    })

    if (existingSettings && existingSettings.user.id !== session.user.id) {
      return {
        success: false,
        error: "This custom URL is already in use.",
      }
    }

    // Update settings
    await prisma.settings.upsert({
      where: { userId: session.user.id },
      update: {
        portfolioUrl,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        isPublic,
        showGithubStats,
        showContactForm,
      },
      create: {
        userId: session.user.id,
        portfolioUrl,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        isPublic,
        showGithubStats,
        showContactForm,
      },
    })

    revalidatePath("/dashboard/settings")

    return { success: true }
  } catch (error) {
    console.error("Update portfolio settings error:", error)
    return {
      success: false,
      error: "An error occurred while updating your portfolio settings.",
    }
  }
}

export async function getUserPortfolio(portfolioUrl: string) {
  try {
    const settings = await prisma.settings.findUnique({
      where: { portfolioUrl },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            title: true,
            bio: true,
            avatar: true,
            github: true,
            linkedin: true,
            projects: true,
          },
        },
      },
    })

    if (!settings || !settings.isPublic) {
      return null
    }

    return {
      user: settings.user,
      settings,
    }
  } catch (error) {
    console.error("Get user portfolio error:", error)
    return null
  }
}

