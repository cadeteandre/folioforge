import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Paintbrush } from "lucide-react"

interface ThemeCardProps {
  theme: {
    id: string
    name: string
    description: string
    preview: string
    isActive: boolean
  }
}

export function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <Image src={theme.preview || "/placeholder.svg"} alt={theme.name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold">{theme.name}</h3>
          <p className="text-sm text-muted-foreground">{theme.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        {theme.isActive ? (
          <Button variant="outline" className="w-full gap-1" disabled>
            <Check className="h-4 w-4" /> Active
          </Button>
        ) : (
          <Button variant="default" className="w-full">
            Apply Theme
          </Button>
        )}
        <Button variant="ghost" size="icon" className="ml-2">
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Customize</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

