

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { RatingStars } from "@/components/rating-stars"
import { getGameById } from "@/lib/games"
import GameInteractiveContent from "@/components/game-interactive-content"
import GameHeaderContent from "@/components/game-header-content"
import { ArrowLeft } from "lucide-react"

const GamePage = async ({ params }) => {
  const { id } = await params

  if (!id) {
    return notFound()
  }

  const game = getGameById(id)

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
              <GameHeaderContent game={game} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Interactive Content - Client Component */}
            <GameInteractiveContent game={game} />
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
