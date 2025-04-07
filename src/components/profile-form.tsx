"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateProfile } from "@/lib/actions/user-actions"
import { Loader2 } from "lucide-react"

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setSuccess(false)
    setError(null)

    const formData = new FormData(event.currentTarget)

    try {
      const result = await updateProfile(formData)

      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || "An error occurred while updating the profile.")
      }
    } catch (error) {
      setError("An error occurred while updating the profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" defaultValue="Test User" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" defaultValue="user@test.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Professional title</Label>
        <Input id="title" name="title" placeholder="E.g.: Full Stack Developer" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Biography</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Tell a bit about yourself and your professional experience"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatar">Profile picture</Label>
        <Input id="avatar" name="avatar" type="file" accept="image/*" />
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      {success && <div className="text-sm text-green-500">Profile updated successfully!</div>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  )
}

