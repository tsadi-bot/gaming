"use client"

import { useState, useMemo } from "react"
import { GameCard } from "@/components/game-card"
import { games } from "@/lib/games"
import { Trophy, Filter, ArrowUpDown, Star, Medal, Award } from "lucide-react"

export default function TopRatedPage() {
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [minRating, setMinRating] = useState(0)
  const [sortOrder, setSortOrder] = useState("desc")

  // Get all unique genres
  const allGenres = useMemo(() => {
    const genres = new Set()
    games.forEach(game => {
      game.genres.forEach(genre => genres.add(genre))
    })
    return ["All", ...Array.from(genres)]
  }, [])

  // Filter and sort games
  const topRatedGames = useMemo(() => {
    let filtered = [...games]

    // Filter by genre
    if (selectedGenre !== "All") {
      filtered = filtered.filter(game => 
        game.genres.includes(selectedGenre)
      )
    }

    // Filter by minimum rating
    if (minRating > 0) {
      filtered = filtered.filter(game => game.rating >= minRating)
    }

    // Sort by rating
    filtered.sort((a, b) => {
      if (sortOrder === "desc") {
        return b.rating - a.rating
      }
      return a.rating - b.rating
    })

    return filtered
  }, [selectedGenre, minRating, sortOrder])

  // Get top 3 for podium
  const podiumGames = useMemo(() => {
    return [...games].sort((a, b) => b.rating - a.rating).slice(0, 3)
  }, [])

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value)
  }

  const handleRatingChange = (e) => {
    setMinRating(Number(e.target.value))
  }

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "desc" ? "asc" : "desc")
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Top Rated <span className="text-primary">Games</span>
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Discover the highest rated games according to our community
            </p>
          </div>
        </div>
      </section>

      {/* Podium Section - Top 3 */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <Medal className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Hall of Fame</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {podiumGames.map((game, index) => (
            <div key={game.id} className="relative">
              <div className="absolute -top-3 left-4 z-10 flex items-center gap-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-background ${
                  index === 0 ? "bg-yellow-500" : 
                  index === 1 ? "bg-gray-400" : 
                  "bg-amber-700"
                }`}>
                  {index === 0 ? (
                    <Award className="h-5 w-5" />
                  ) : (
                    <span>#{index + 1}</span>
                  )}
                </div>
              </div>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>
          
          {/* Genre Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="genre" className="text-sm text-muted-foreground">
              Genre:
            </label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={handleGenreChange}
              className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="rating" className="text-sm text-muted-foreground">
              Min Rating:
            </label>
            <select
              id="rating"
              value={minRating}
              onChange={handleRatingChange}
              className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value={0}>All</option>
              <option value={7}>7+</option>
              <option value={8}>8+</option>
              <option value={9}>9+</option>
            </select>
          </div>

          {/* Sort Order */}
          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <ArrowUpDown className="h-4 w-4" />
            {sortOrder === "desc" ? "Highest First" : "Lowest First"}
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{topRatedGames.length}</span> games
          </span>
        </div>

        {/* Games Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topRatedGames.map((game, index) => (
            <div key={game.id} className="relative">
              <div className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                #{index + 1}
              </div>
              <GameCard game={game} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {topRatedGames.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Trophy className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-semibold text-foreground">No games found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-primary">
              {games.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Games</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-primary">
              {(games.reduce((acc, game) => acc + game.rating, 0) / games.length).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-primary">
              {games.reduce((acc, game) => acc + game.reviewCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Reviews</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-primary">
              {Math.max(...games.map(g => g.rating))}
            </div>
            <div className="text-sm text-muted-foreground">Highest Rating</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              GameRate - Your trusted source for game reviews and ratings.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                About
              </a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Contact
              </a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
