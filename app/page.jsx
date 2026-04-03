import GameCard from "@/components/game-card";
import { games } from "@/lib/games"
import { TrendingUp, Trophy, Sparkles } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const topRatedGames = [...games].sort((a, b) => b.rating - a.rating).slice(0, 3)
  
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Discover & Rate Your{" "}
              <span className="text-primary">Favorite Games</span>
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Explore thousands of games, read honest reviews, and share your ratings with the gaming community.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{games.length}+ Games</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">50K+ Reviews</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Daily Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <Trophy className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Top Rated</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topRatedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* All Games Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">All Games</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Rating</option>
              <option>Release Date</option>
              <option>Name</option>
            </select>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  )
}
