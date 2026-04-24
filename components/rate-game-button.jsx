"use client"

import { useState, useRef, useEffect } from "react"
import { Star } from "lucide-react"
import { useGameDataContext } from "@/lib/GameContext"

export default function RateGameButton({ onRate, gameId }) {
  const { getGameRating, setGameRating } = useGameDataContext()
  const [isOpen, setIsOpen] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)
  const menuRef = useRef(null)
  const userRating = getGameRating(gameId)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleRating = (rating) => {
    setGameRating(gameId, rating)
    onRate?.(rating)
    setIsOpen(false)
    // Dispatch event to notify other components about the rating change
    window.dispatchEvent(new CustomEvent('gameRatingUpdated', { 
      detail: { gameId, rating } 
    }))
  }

  const stars = [2, 4, 6, 8, 10]
  const displayRating = hoverRating || userRating || 0

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl uppercase tracking-wider flex items-center gap-2 transition-all"
      >
        <Star className="h-5 w-5 fill-white" />
        {userRating ? `Rated: ${userRating}/10` : "Rate Game"}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-zinc-900 border border-white/10 rounded-xl p-4 shadow-lg z-50">
          <div className="flex gap-2">
            {stars.map((rating) => (
              <button
                key={rating}
                onMouseEnter={() => setHoverRating(rating)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRating(rating)}
                className="transition-all hover:scale-110"
              >
                <Star
                  size={28}
                  className={`${
                    rating <= displayRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-zinc-600"
                  } transition-all`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-white font-bold mt-2 text-sm">
            {displayRating > 0 ? `${displayRating}/10` : "Select rating"}
          </p>
        </div>
      )}
    </div>
  )
}
