"use client"

import { useState, useEffect } from "react"
import { RatingStars } from "@/components/rating-stars"

export default function GameHeaderContent({ game }) {
  const [currentRating, setCurrentRating] = useState(game.rating)

  useEffect(() => {
    // Listen for rating changes from the action bar
    const handleRatingUpdate = (event) => {
      if (event.detail?.rating) {
        setCurrentRating(event.detail.rating)
      }
    }

    window.addEventListener("gameRatingUpdated", handleRatingUpdate)
    return () => window.removeEventListener("gameRatingUpdated", handleRatingUpdate)
  }, [])

  return (
    <div className="flex items-center gap-6">
      <div className="bg-blue-600 px-4 py-1.5 rounded-xl font-black text-2xl text-white shadow-lg shadow-blue-600/20">
        {currentRating}
      </div>
      <RatingStars rating={currentRating} size="sm" />
    </div>
  )
}
