"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"
import * as bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"

type AuthResult = {
  success: boolean
  error?: string
}

// Helper function to create JWT token
async function createToken(payload: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret")
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret)
}

// Helper function to verify JWT token
async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret")
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    return null
  }
}

export async function registerUser(formData: FormData): Promise<AuthResult> {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Basic validation
    if (!name || !email || !password) {
      return {
        success: false,
        error: "All fields are required.",
      }
    }

    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long.",
      }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        success: false,
        error: "Email already in use.",
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        settings: {
          create: {
            portfolioUrl: email
              .split("@")[0]
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "-"),
          },
        },
      },
    })

    // Create JWT token
    const token = await createToken({ id: user.id })

    // Set cookie
    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      error: "An error occurred during registration.",
    }
  }
}

export async function loginUser(formData: FormData): Promise<AuthResult> {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Basic validation
    if (!email || !password) {
      return {
        success: false,
        error: "Email and password are required.",
      }
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return {
        success: false,
        error: "Invalid credentials.",
      }
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return {
        success: false,
        error: "Invalid credentials.",
      }
    }

    // Create JWT token
    const token = await createToken({ id: user.id })

    // Set cookie
    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: "An error occurred during login.",
    }
  }
}

export async function logoutUser() {
  cookies().delete("auth-token")
  redirect("/")
}

export async function getSession() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const payload = await verifyToken(token)

    if (!payload || typeof payload.id !== "string") {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        title: true,
      },
    })

    if (!user) {
      return null
    }

    return { user }
  } catch (error) {
    console.error("Session error:", error)
    return null
  }
}

