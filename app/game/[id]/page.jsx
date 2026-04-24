

"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { RatingStars } from "@/components/rating-stars"
import { Button } from "@/components/ui/button"
import { getGameById } from "@/lib/games"
import { WishlistButton } from "@/components/wishlist-button"
import ReviewModal from "@/components/review-modal" 
import { ArrowLeft, Star, MessageSquare, ShieldCheck } from "lucide-react"


const GamePage = ({ params: paramsPromise }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("rate")
  const [game, setGame] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGame() {
      try {
        const resolvedParams = await paramsPromise
        if (resolvedParams?.id) {
          const foundGame = getGameById(resolvedParams.id)
          setGame(foundGame)
          // Load reviews from localStorage
          const savedReviews = localStorage.getItem(`reviews-${resolvedParams.id}`)
          if (savedReviews) {
            setReviews(JSON.parse(savedReviews))
          }
        }
      } catch (error) {
        console.error("Error loading game:", error)
      } finally {
        setLoading(false)
      }
    }
    loadGame()
  }, [paramsPromise])

  const handleAddReview = (reviewData) => {
    const newReview = {
      id: Date.now(),
      name: reviewData.name,
      text: reviewData.text,
      rating: reviewData.rating || 5,
      date: new Date().toLocaleDateString()
    }
    const updatedReviews = [newReview, ...reviews]
    setReviews(updatedReviews)
    // Save to localStorage
    if (game) {
      localStorage.setItem(`reviews-${game.id}`, JSON.stringify(updatedReviews))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-blue-500 font-black text-2xl animate-pulse tracking-tighter">
          LOADING GAME...
        </div>
      </div>
    )
  }

  if (!game) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={game.screenshots?.[0] || game.coverImage}
          alt={game.title}
          fill
          className="object-cover opacity-30 blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="container relative mx-auto px-4 pt-12 h-full flex flex-col justify-between pb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-blue-500 transition-all uppercase tracking-widest">
            <ArrowLeft className="h-4 w-4" /> Back to Discover
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="relative aspect-[3/4] w-48 md:w-64 shrink-0 overflow-hidden rounded-2xl shadow-2xl border border-white/10 hidden md:block">
              <Image src={game.coverImage} alt={game.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {game.genres?.map((genre, i) => (
                  <span key={i} className="text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20">
                    {genre}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-none text-white">
                {game.title}
              </h1>
              <div className="flex items-center gap-6">
                <div className="bg-blue-600 px-4 py-1.5 rounded-xl font-black text-2xl text-white shadow-lg shadow-blue-600/20">
                  {game.rating}
                </div>
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
            {/* Action Bar */}
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
              <WishlistButton gameId={game.id} />
            </div>

            {/* Summary */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black flex items-center gap-3 text-white uppercase tracking-tighter">
                <ShieldCheck className="text-blue-500 h-7 w-7" /> Summary
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                {game.longDescription}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black flex items-center gap-3 text-white uppercase tracking-tighter">
                <MessageSquare className="text-blue-500 h-7 w-7" /> User Reviews ({reviews.length})
              </h2>
              
              {reviews.length === 0 ? (
                <div className="p-8 bg-zinc-900/30 rounded-2xl border border-white/5 text-center">
                  <p className="text-zinc-400 font-medium">No reviews yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-6 bg-zinc-900/30 rounded-2xl border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-black text-white text-lg">{review.name}</h3>
                          <p className="text-xs text-zinc-500 uppercase tracking-widest">{review.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'fill-blue-500 text-blue-500' : 'text-zinc-600'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-zinc-300 text-sm leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8 bg-zinc-900/30 p-8 rounded-[2rem] border border-white/5 h-fit">
             <div>
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">Developer</h4>
                <p className="text-white font-bold">{game.developer}</p>
             </div>
             <div>
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">Release Date</h4>
                <p className="text-white font-bold">{game.releaseDate}</p>
             </div>
             <div>
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">Platforms</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {game.platforms?.map((p, i) => (
                    <span key={i} className="text-xs font-bold text-zinc-300">{p}{i !== game.platforms.length - 1 ? "," : ""}</span>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </main>

      <ReviewModal 
        gameTitle={game.title} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mode={modalMode}
        onReviewSubmit={handleAddReview}
      />
    </div>
  )
}

export default GamePage

// const GamePage = async ({ params }) => {

//     const { id } = await params

//     return (
//         <div className="min-h-screen bg-[#050505] flex items-center justify-center">
//             <div className="text-blue-500 font-black text-2xl animate-pulse tracking-tighter">
//                 Show game details for: id = {id}
//             </div>
//         </div>
//     )
// }

// export default GamePage
