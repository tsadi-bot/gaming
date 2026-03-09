import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"




export function GameCard({ game }) {
  return (
    <Link href={`/game/${game.id}`}>
      <Card className="group overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 text-primary">
              <Star className="h-5 w-5 fill-primary" />
              <span className="text-lg font-bold">{game.rating}</span>
              <span className="text-sm text-muted-foreground">({game.reviewCount.toLocaleString()})</span>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {game.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {game.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
