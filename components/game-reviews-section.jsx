"use client"

import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { Star, MessageSquare } from "lucide-react"

const GameReviewsSection = forwardRef(function GameReviewsSection({ gameId, initialReviews = [] }, ref) {
  const [reviews, setReviews] = useState(initialReviews)

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem(`reviews-${gameId}`)
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    }
  }, [gameId])

  useImperativeHandle(ref, () => ({
    addReview: (reviewData) => {
      const newReview = {
        id: Date.now(),
        name: reviewData.name,
        text: reviewData.text,
        rating: reviewData.rating || 5,
        date: new Date().toLocaleDateString()
      }
      const updatedReviews = [newReview, ...reviews]
      setReviews(updatedReviews)
      localStorage.setItem(`reviews-${gameId}`, JSON.stringify(updatedReviews))
    }
  }))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black flex items-center gap-3 text-white uppercase tracking-tighter">
        <MessageSquare className="text-blue-500 h-7 w-7" /> User Reviews ({reviews.length})
      </h2>
      
      {reviews.length === 0 ? (
        <div className="p-8 bg-zinc-900/30 rounded-2xl border border-white/5 text-center">
          <p className="text-zinc-400 font-medium">No reviews yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 bg-zinc-900/30 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-white text-lg">{review.name}</h3>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'fill-blue-500 text-blue-500' : 'text-zinc-600'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})

export default GameReviewsSection
