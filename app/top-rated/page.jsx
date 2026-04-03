"use client"

import { useState, useMemo } from "react"
import { games } from "@/lib/games"
import GameCard from "@/components/game-card"
import PageHeader from "@/components/PageHeader" // Το component που φτιάξαμε
import { Trophy, Filter, ArrowUpDown, Star, Medal, Award } from "lucide-react"

export default function TopRatedPage() {
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [minRating, setMinRating] = useState(8)
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
    return filtered.sort((a, b) => {
      return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating
    })
  }, [selectedGenre, minRating, sortOrder])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      
      {/* 1. Χρήση του PageHeader για ομοιομορφία */}
      <PageHeader 
        title="Top" 
        highlight="Rated" 
        subtitle="The highest scoring titles as voted by the community." 
      />

      <main className="container mx-auto px-4 py-8">
        {/* 2. Filters Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-lg border border-white/10 text-sm">
                <Filter className="w-4 h-4 text-blue-500" />
                <select 
                  className="bg-transparent outline-none"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  {allGenres.map(g => <option key={g} value={g} className="bg-zinc-900">{g}</option>)}
                </select>
             </div>
             
             <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-lg border border-white/10 text-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-zinc-400">Min:</span>
                <input 
                  type="number" 
                  min="0" max="10" step="0.1"
                  className="bg-transparent w-12 outline-none font-bold"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                />
             </div>
          </div>

          <button 
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="flex items-center gap-2 hover:text-blue-500 transition-colors text-sm font-medium"
          >
            <ArrowUpDown className="w-4 h-4" />
            Rating: {sortOrder === "desc" ? "High to Low" : "Low to High"}
          </button>
        </div>

        {/* 3. Game Grid - Χρήση του GameCard */}
        {topRatedGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {topRatedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-50">
            <p>No games found matching your filters.</p>
          </div>
        )}
      </main>
    </div>
  )
}
