"use client"

import { useRef } from "react"
import GameActionBar from "@/components/game-action-bar"
import GameReviewsSection from "@/components/game-reviews-section"
import { ShieldCheck } from "lucide-react"

export default function GameInteractiveContent({ game }) {
  const reviewsSectionRef = useRef(null)

  const handleReviewAdd = (reviewData) => {
    if (reviewsSectionRef.current) {
      reviewsSectionRef.current.addReview(reviewData)
    }
  }

  return (
    <div className="space-y-12">
      {/* Action Bar */}
      <GameActionBar 
        gameId={game.slug} 
        gameTitle={game.title}
        onReviewAdd={handleReviewAdd}
      />

      {/* Summary */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black flex items-center gap-3 text-white uppercase tracking-tighter">
          <ShieldCheck className="text-blue-500 h-7 w-7" /> Summary
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed font-medium">
          {game.longDescription}
        </p>
      </div>

      {/* Reviews Section */}
      <GameReviewsSection 
        ref={reviewsSectionRef}
        gameId={game.id} 
      />
    </div>
  )
}
