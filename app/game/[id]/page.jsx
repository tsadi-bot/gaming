"use client"

import { useState, useEffect } from "react"
import { notFound, useParams } from "next/navigation" // Πρόσθεσα το useParams
import Image from "next/image"
import Link from "next/link"
import { RatingStars } from "@/components/rating-stars"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { getGameById } from "@/lib/games"
import { WishlistButton } from "@/components/wishlist-button"
import ReviewModal from "@/components/review-modal" 
import { ArrowLeft, Star, MessageSquare, Calendar, ShieldCheck, Monitor } from "lucide-react"

export default function GamePage() {
  const params = useParams() // Πιο σίγουρος τρόπος για να πάρουμε το ID
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("rate")
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.id) {
      const foundGame = getGameById(params.id)
      setGame(foundGame)
      setLoading(false)
    }
  }, [params])

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-blue-500 font-bold">LOADING...</div>
  if (!game) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src={game.screenshots[0] || game.coverImage}
          alt={game.title}
          fill
          className="object-cover opacity-30 blur-[1px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="container relative mx-auto px-4 pt-12 h-full flex flex-col justify-between pb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-blue-500 transition-all">
            <ArrowLeft className="h-4 w-4" /> BACK TO DISCOVER
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="relative aspect-[3/4] w-48 md:w-64 shrink-0 overflow-hidden rounded-2xl shadow-2xl border border-border hidden md:block">
              <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-none">{game.title}</h1>
              <div className="flex items-center gap-6">
                <div className="bg-blue-600 px-4 py-1.5 rounded-xl font-black text-2xl text-white shadow-lg">{game.rating}</div>
                <RatingStars rating={game.rating} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex flex-wrap items-center gap-4 p-8 bg-card rounded-[2.5rem] border border-border backdrop-blur-md">
              <Button onClick={() => { setModalMode("rate"); setIsModalOpen(true); }} className="h-14 px-10 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl uppercase">
                <Star className="mr-2 h-5 w-5 fill-white" /> Rate
              </Button>
              <Button onClick={() => { setModalMode("review"); setIsModalOpen(true); }} variant="outline" className="h-14 px-10 border-border font-black rounded-2xl uppercase">
                <MessageSquare className="mr-2 h-5 w-5 text-blue-500" /> Review
              </Button>
              <WishlistButton gameId={game.id} />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-black flex items-center gap-3"><ShieldCheck className="text-blue-500 h-8 w-8" /> SUMMARY</h2>
              <p className="text-muted-foreground text-xl leading-relaxed">{game.longDescription}</p>
            </div>
          </div>
        </div>
      </main>

      <ReviewModal gameTitle={game.title} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={modalMode} />
    </div>
  )
}
