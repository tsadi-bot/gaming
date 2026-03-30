'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WishlistButton({ gameId, size = 'sm', onToggle }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const newState = !isWishlisted
    setIsWishlisted(newState)
    onToggle?.(newState)
  }

  if (size === 'lg') {
    return (
      <Button
        variant={isWishlisted ? 'default' : 'outline'}
        size="lg"
        onClick={handleToggle}
        className={`gap-2 transition-all duration-200 ${
          isWishlisted
            ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
            : 'hover:border-red-500 hover:text-red-500'
        }`}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={`h-5 w-5 transition-all duration-200 ${
            isWishlisted ? 'fill-white' : ''
          }`}
        />
        {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="h-8 w-8 transition-colors duration-200"
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={`h-5 w-5 transition-all duration-200 ${
          isWishlisted
            ? 'fill-red-500 text-red-500'
            : 'text-muted-foreground hover:text-red-500'
        }`}
      />
    </Button>
  )
}
