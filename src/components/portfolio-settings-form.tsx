"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { updatePortfolioSettings } from "@/lib/actions/user-actions"
import { Loader2 } from "lucide-react"

export function PortfolioSettingsForm() {
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
      const result = await updatePortfolioSettings(formData)

      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || "An error occurred while updating the settings.")
      }
    } catch (error) {
      setError("An error occurred while updating the settings. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="portfolioUrl">Custom URL</Label>
        <div className="flex items-center">
          <span className="text-muted-foreground mr-2">folioforge.com/</span>
          <Input id="portfolioUrl" name="portfolioUrl" defaultValue="test-user" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="seoTitle">SEO Title</Label>
        <Input id="seoTitle" name="seoTitle" placeholder="Title for search engines" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seoDescription">SEO Description</Label>
        <Input id="seoDescription" name="seoDescription" placeholder="Description for search engines" />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="isPublic" className="cursor-pointer">
          Public portfolio
        </Label>
        <Switch id="isPublic" name="isPublic" defaultChecked />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="showGithubStats" className="cursor-pointer">
          Show GitHub statistics
        </Label>
        <Switch id="showGithubStats" name="showGithubStats" defaultChecked />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="showContactForm" className="cursor-pointer">
          Show contact form
        </Label>
        <Switch id="showContactForm" name="showContactForm" defaultChecked />
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      {success && <div className="text-sm text-green-500">Settings updated successfully!</div>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Settings"
        )}
      </Button>
    </form>
  )
}

