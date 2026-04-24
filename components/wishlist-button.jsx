"use client"

import { useState, useRef, useEffect } from "react"
import { Heart } from "lucide-react"
import { useGameDataContext } from "@/lib/GameContext"

export function WishlistButton({ gameId }) {
  const { isWishlisted, addToWishlist, removeFromWishlist } = useGameDataContext()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleWishlistToggle = (action) => {
    if (action === "add") {
      addToWishlist(gameId)
    } else {
      removeFromWishlist(gameId)
    }
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          h-14 px-8 rounded-xl font-black uppercase tracking-wider flex items-center gap-2 transition-all border-2
          ${isWishlisted(gameId)
            ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-500" 
            : "bg-zinc-800/40 border-zinc-700 text-zinc-400 hover:border-red-500/50 hover:text-red-500"
          }
        `}
      >
        <Heart 
          className={`h-5 w-5 transition-all duration-300 ${
            isWishlisted(gameId) ? "fill-white" : "fill-transparent"
          }`} 
        />
        {isWishlisted(gameId) ? "Wishlisted" : "Wishlist"}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-zinc-900 border border-white/10 rounded-xl p-3 shadow-lg z-50">
          <button
            onClick={() => handleWishlistToggle("add")}
            className="w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2 font-semibold"
          >
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            Add to Wishlist
          </button>
          <button
            onClick={() => handleWishlistToggle("remove")}
            className="w-full text-left px-4 py-2 text-zinc-400 hover:bg-white/10 rounded-lg transition-all font-semibold"
          >
            Remove from Wishlist
          </button>
        </div>
      )}
    </div>
  )
}
