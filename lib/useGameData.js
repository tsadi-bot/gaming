'use client'

import { useState, useEffect } from 'react'

const RATINGS_KEY = 'gameRatings'
const WISHLIST_KEY = 'gameWishlist'

export function useGameData() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [ratings, setRatings] = useState({})
  const [wishlist, setWishlist] = useState(new Set())

  // Load data from localStorage on mount
  useEffect(() => {
    const savedRatings = localStorage.getItem(RATINGS_KEY)
    const savedWishlist = localStorage.getItem(WISHLIST_KEY)

    if (savedRatings) {
      try {
        setRatings(JSON.parse(savedRatings))
      } catch (e) {
        console.error('Failed to parse ratings:', e)
      }
    }

    if (savedWishlist) {
      try {
        setWishlist(new Set(JSON.parse(savedWishlist)))
      } catch (e) {
        console.error('Failed to parse wishlist:', e)
      }
    }

    setIsHydrated(true)
  }, [])

  // Save ratings to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings))
    }
  }, [ratings, isHydrated])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(Array.from(wishlist)))
    }
  }, [wishlist, isHydrated])

  const setGameRating = (gameId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [gameId]: rating,
    }))
  }

  const getGameRating = (gameId) => {
    return ratings[gameId] || 0
  }

  const addToWishlist = (gameId) => {
    setWishlist((prev) => new Set([...prev, gameId]))
  }

  const removeFromWishlist = (gameId) => {
    setWishlist((prev) => {
      const newSet = new Set(prev)
      newSet.delete(gameId)
      return newSet
    })
  }

  const isWishlisted = (gameId) => {
    return wishlist.has(gameId)
  }

  const toggleWishlist = (gameId) => {
    if (isWishlisted(gameId)) {
      removeFromWishlist(gameId)
    } else {
      addToWishlist(gameId)
    }
  }

  return {
    isHydrated,
    ratings,
    wishlist,
    setGameRating,
    getGameRating,
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
    toggleWishlist,
  }
}
