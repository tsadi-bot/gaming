"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star, X } from "lucide-react"

export default function ReviewModal({ gameTitle, isOpen, onClose, mode, onReviewSubmit }) {
  const [rating, setRating] = useState(5)
  const [name, setName] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [hoveredRating, setHoveredRating] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (mode === "review") {
      if (!name.trim() || !reviewText.trim()) {
        alert("Please fill in all fields")
        return
      }
      onReviewSubmit({
        name: name.trim(),
        text: reviewText.trim(),
        rating: rating
      })
    }
    
    // Reset form
    setName("")
    setReviewText("")
    setRating(5)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-md w-full p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-zinc-400" />
        </button>

        <div>
          <h2 className="text-2xl font-black text-white">
            {mode === "review" ? "Write a Review" : "Rate This Game"}
          </h2>
          <p className="text-sm text-zinc-400 mt-1">{gameTitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === "review" && (
            <>
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-black text-zinc-300 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <label htmlFor="review" className="text-sm font-black text-zinc-300 uppercase tracking-wider">
                  Your Review
                </label>
                <textarea
                  id="review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your thoughts about this game..."
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </>
          )}

          {/* Rating Stars */}
          <div className="space-y-2">
            <label className="text-sm font-black text-zinc-300 uppercase tracking-wider block">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className="transition-colors"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating ?? rating)
                        ? "fill-blue-500 text-blue-500"
                        : "text-zinc-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-lg uppercase tracking-wider"
          >
            {mode === "review" ? "Submit Review" : "Submit Rating"}
          </Button>
        </form>
      </div>
    </div>
  )
}
