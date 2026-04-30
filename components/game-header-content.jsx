"use client"

import { RatingStars } from "@/components/rating-stars"
import { useGameDataContext } from "@/lib/GameContext"

export default function GameHeaderContent({ game }) {
  const { getGameRating, isHydrated } = useGameDataContext()
  
  // Use user rating if available, otherwise use the game's default rating
  const userRating = getGameRating(game.slug)
  const displayRating = userRating > 0 ? userRating : game.rating

  return (
    <div className="flex items-center gap-6">
      <div className="bg-blue-600 px-4 py-1.5 rounded-xl font-black text-2xl text-white shadow-lg shadow-blue-600/20">
        {displayRating}
      </div>
      <RatingStars rating={displayRating} size="sm" />
      {isHydrated && userRating > 0 && (
        <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">
          Your Rating
        </span>
      )}
    </div>
  )
}
