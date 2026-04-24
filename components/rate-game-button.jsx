"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export function RateGameButton({ gameId, onRatingSubmit }) {
  const [isRated, setIsRated] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const handleRatingSubmit = (rating) => {
    setUserRating(rating)
    setIsRated(true)
    onRatingSubmit?.(rating)
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-zinc-900/30 rounded-2xl border border-white/5">
      <Button
        onClick={() => setHoverRating(hoverRating > 0 ? hoverRating : 0)}
        className={`
          h-14 px-10 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 active:scale-95 border-2
          ${isRated 
            ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
            : "bg-zinc-800/40 border-zinc-700 text-zinc-400 hover:border-blue-500/50 hover:text-blue-500"
          }
        `}
      >
        <Star 
          className={`mr-2 h-5 w-5 transition-all duration-300 ${
            isRated ? "fill-white scale-110" : "fill-transparent"
          }`} 
        />
        {isRated ? `Rated: ${userRating}/10` : "Rate Game"}
      </Button>

      {!isRated && (
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }, (_, i) => {
            const ratingValue = (i + 1) * 2
            return (
              <button
                key={i}
                onMouseEnter={() => setHoverRating(ratingValue)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRatingSubmit(ratingValue)}
                className="transition-all duration-200 hover:scale-125"
              >
                <Star
                  size={28}
                  className={`transition-all duration-200 ${
                    hoverRating >= ratingValue
                      ? "fill-blue-500 text-blue-500"
                      : "fill-zinc-700 text-zinc-700"
                  }`}
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
