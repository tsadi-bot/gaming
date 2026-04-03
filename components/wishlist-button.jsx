"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function WishlistButton({ gameId }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <Button
      onClick={() => setIsWishlisted(!isWishlisted)}
      className={`
        h-14 px-10 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 active:scale-95 border-2
        ${isWishlisted 
          ? "bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]" 
          : "bg-zinc-800/40 border-zinc-700 text-zinc-400 hover:border-red-500/50 hover:text-red-500"
        }
      `}
    >
      <Heart 
        className={`mr-2 h-5 w-5 transition-all duration-300 ${
          isWishlisted ? "fill-white scale-110" : "fill-transparent"
        }`} 
      />
      {isWishlisted ? "Wishlisted" : "Wishlist"}
    </Button>
  )
}
