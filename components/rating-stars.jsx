"use client"

import { Star } from "lucide-react"
import { useState } from "react"



export function RatingStars({
  rating,
  maxRating = 5,
  interactive = false,
  onRatingChange,
  size = "md"
}) {
  const [hoverRating, setHoverRating] = useState(0)
  
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  }

  const normalizedRating = (rating / 10) * maxRating

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1
        const filled = interactive 
          ? (hoverRating || normalizedRating) >= starValue
          : normalizedRating >= starValue
        
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && onRatingChange?.(starValue * 2)}
            className={`transition-colors ${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                filled
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted-foreground"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
