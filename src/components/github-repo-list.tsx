"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, GitFork, Plus } from "lucide-react"

export function GithubRepoList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Example repositories
  const repos = [
    {
      id: "1",
      name: "ecommerce-app",
      description: "A complete e-commerce application with shopping cart and payments.",
      language: "TypeScript",
      stars: 45,
      forks: 12,
      isImported: true,
    },
    {
      id: "2",
      name: "personal-blog",
      description: "A personal blog with content management system.",
      language: "JavaScript",
      stars: 23,
      forks: 5,
      isImported: true,
    },
    {
      id: "3",
      name: "finance-app",
      description: "A personal finance management application.",
      language: "TypeScript",
      stars: 67,
      forks: 15,
      isImported: false,
    },
    {
      id: "4",
      name: "admin-dashboard",
      description: "An administrative dashboard for user and content management.",
      language: "JavaScript",
      stars: 34,
      forks: 8,
      isImported: false,
    },
    {
      id: "5",
      name: "weather-app",
      description: "A weather forecast application using public APIs.",
      language: "JavaScript",
      stars: 12,
      forks: 3,
      isImported: false,
    },
  ]

  const filteredRepos = repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub Repositories</CardTitle>
        <CardDescription>Select the repositories you want to import to your portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search repositories..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredRepos.map((repo) => (
              <div key={repo.id} className="flex items-start justify-between border-b pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{repo.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {repo.language}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{repo.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                </div>
                <Button variant={repo.isImported ? "outline" : "default"} size="sm" className="gap-1">
                  {repo.isImported ? (
                    "Imported"
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" /> Import
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

