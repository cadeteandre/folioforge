import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, RefreshCw } from "lucide-react"
import { GithubRepoList } from "@/components/dashboard/github-repo-list"

export default function GithubIntegrationPage() {
  // GitHub connection status simulation
  const isConnected = true

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">GitHub Integration</h2>
        <p className="text-muted-foreground">Connect your GitHub account to automatically import projects.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>GitHub Account</CardTitle>
          <CardDescription>Connect your GitHub account to sync your repositories.</CardDescription>
        </CardHeader>
        <CardContent>
          {isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-green-500 h-2 w-2"></div>
                <span className="font-medium">Connected as @username</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-1">
                  <RefreshCw className="h-4 w-4" /> Sync Repositories
                </Button>
                <Button variant="outline" className="text-destructive">
                  Disconnect
                </Button>
              </div>
            </div>
          ) : (
            <Button className="gap-1">
              <Github className="h-4 w-4" /> Connect with GitHub
            </Button>
          )}
        </CardContent>
      </Card>

      {isConnected && <GithubRepoList />}
    </div>
  )
}

