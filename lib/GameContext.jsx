'use client'

import React, { createContext, useContext } from 'react'
import { useGameData } from './useGameData'

const GameDataContext = createContext()

export function GameDataProvider({ children }) {
  const gameData = useGameData()

  return (
    <GameDataContext.Provider value={gameData}>
      {children}
    </GameDataContext.Provider>
  )
}

export function useGameDataContext() {
  const context = useContext(GameDataContext)
  if (!context) {
    throw new Error('useGameDataContext must be used within GameDataProvider')
  }
  return context
}
