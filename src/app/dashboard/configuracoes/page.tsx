import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { PortfolioSettingsForm } from "@/components/dashboard/portfolio-settings-form"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">Gerencie suas configurações de perfil e portfólio.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Atualize suas informações pessoais e profissionais.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações do Portfólio</CardTitle>
            <CardDescription>Personalize as configurações do seu portfólio.</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioSettingsForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

