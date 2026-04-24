"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WishlistButton } from "@/components/wishlist-button"
import ReviewModal from "@/components/review-modal"
import { Star, MessageSquare } from "lucide-react"

export default function GameActionBar({ gameId, gameTitle, onReviewAdd }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("rate")

  const handleReviewSubmit = (reviewData) => {
    onReviewAdd(reviewData)
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 p-6 bg-zinc-900/50 rounded-[2rem] border border-white/5 backdrop-blur-md">
        <Button 
          onClick={() => { setModalMode("rate"); setIsModalOpen(true); }} 
          className="h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl uppercase tracking-wider"
        >
          <Star className="mr-2 h-5 w-5 fill-white" /> Rate Game
        </Button>
        <Button 
          onClick={() => { setModalMode("review"); setIsModalOpen(true); }} 
          variant="outline" 
          className="h-14 px-8 border-white/10 hover:bg-white/5 font-black rounded-xl uppercase tracking-wider"
        >
          <MessageSquare className="mr-2 h-5 w-5 text-blue-500" /> Write Review
        </Button>
        <WishlistButton gameId={gameId} />
      </div>

      <ReviewModal 
        gameTitle={gameTitle} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mode={modalMode}
        onReviewSubmit={handleReviewSubmit}
      />
    </>
  )
}
