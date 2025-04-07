import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { PortfolioSettingsForm } from "@/components/dashboard/portfolio-settings-form"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your profile and portfolio settings.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal and professional information.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Settings</CardTitle>
            <CardDescription>Customize your portfolio settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioSettingsForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

