"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
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

export default function GamePage({ params: paramsPromise }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("rate")
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGame() {
      try {
        // Περιμένουμε τα params να γίνουν resolved
        const resolvedParams = await paramsPromise;
        if (resolvedParams && resolvedParams.id) {
          const foundGame = getGameById(resolvedParams.id);
          setGame(foundGame);
        }
      } catch (error) {
        console.error("Error loading game:", error);
      } finally {
        setLoading(false);
      }
    }
    loadGame();
  }, [paramsPromise]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-blue-500 font-bold">Loading...</div>
  if (!game) notFound()

  const openModal = (mode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src={game.screenshots[0]}
          alt={game.title}
          fill
          className="object-cover opacity-30 blur-[1px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="container relative mx-auto px-4 pt-12 h-full flex flex-col justify-between pb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-blue-500 transition-all">
            <ArrowLeft className="h-4 w-4" /> BACK TO DISCOVER
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="relative aspect-[3/4] w-48 md:w-64 shrink-0 overflow-hidden rounded-2xl shadow-2xl border border-white/10 hidden md:block">
              <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {game.genres.map(genre => (
                  <Badge key={genre} variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1 text-[10px] font-black uppercase">
                    {genre}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-none">{game.title}</h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 px-4 py-1.5 rounded-xl font-black text-2xl shadow-lg shadow-blue-600/20">{game.rating}</div>
                  <div>
                    <RatingStars rating={game.rating} size="sm" />
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">Global Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex flex-wrap gap-4 p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 rounded-2xl h-14 uppercase tracking-wider"
                onClick={() => openModal("rate")}
              >
                <Star className="mr-2 h-5 w-5 fill-white" /> Rate
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 text-white font-black px-10 rounded-2xl h-14 uppercase tracking-wider"
                onClick={() => openModal("review")}
              >
                <MessageSquare className="mr-2 h-5 w-5 text-blue-500" /> Review
              </Button>
              <WishlistButton gameId={game.id} size="lg" />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-black flex items-center gap-3 tracking-tight">
                <ShieldCheck className="text-blue-500 h-8 w-8" /> SUMMARY
              </h2>
              <p className="text-zinc-400 leading-relaxed text-xl font-medium">{game.longDescription}</p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-widest text-blue-500/50">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {game.screenshots.map((s, i) => (
                  <div key={i} className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10">
                    <Image src={s} alt="screenshot" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <Card className="bg-zinc-900/30 border-white/5 rounded-[2rem] p-8 backdrop-blur-xl">
              <CardTitle className="text-[10px] uppercase font-black tracking-[0.3em] text-blue-500 mb-8">Specification</CardTitle>
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-zinc-500 text-sm font-bold">
                    <Calendar size={18} className="text-blue-500" /> RELEASE
                  </div>
                  <div className="font-black text-sm">{game.releaseDate}</div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-zinc-500 text-sm font-bold">
                    <Monitor size={18} className="text-blue-500" /> PLATFORMS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map(p => (
                      <Badge key={p} variant="outline" className="text-[9px] font-black uppercase bg-white/5 border-white/10">{p}</Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-8 border-t border-white/5">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Developed By</p>
                  <p className="font-black text-xl text-blue-400 tracking-tighter">{game.developer}</p>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </main>

      <ReviewModal
        gameTitle={game.title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  )
}
