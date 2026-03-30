'use client'

import { GameCard } from '@/components/game-card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { games } from '@/lib/games'
import { Sparkles, Flame, Calendar } from 'lucide-react'

export default function NewReleasesPage() {
  // Ταξινόμηση από το πιο πρόσφατο στο παλαιότερο
  const newReleases = [...games].sort((a, b) => 
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  )
  const featuredGames = newReleases.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Fresh & Exciting</span>
            </div>
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              New <span className="text-primary">Game Releases</span>
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Discover the latest games to hit the market. Stay updated with fresh releases and upcoming titles.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Carousel Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <Flame className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Featured Releases</h2>
        </div>
        
        <div className="relative mx-auto w-full px-12"> {/* Πρόσθεσα padding για τα βέλη */}
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredGames.map((game) => (
                <CarouselItem key={game.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <GameCard game={game} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* All New Releases Grid */}
      <section className="container mx-auto px-4 py-12 pb-24">
        <div className="mb-8 flex items-center gap-3">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">All Releases</h2>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newReleases.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  )
}
