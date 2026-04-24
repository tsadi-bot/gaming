"use client"

import { useState } from "react"
import { RateGameButton } from "@/components/rate-game-button"

export default function RateGameWrapper({ gameId }) {
  const handleRatingSubmit = (rating) => {
    console.log(`Game ${gameId} rated with ${rating}/10`)
    // Here you can add logic to save the rating to a database or state management
  }

  return (
    <RateGameButton 
      gameId={gameId} 
      onRatingSubmit={handleRatingSubmit}
    />
  )
}
