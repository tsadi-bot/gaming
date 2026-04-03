import { games } from "@/lib/games";
import GameFilters from "@/components/game-filters";
import GameCard from "@/components/game-card"; // Το component με τα links
import { Sparkles, Award } from "lucide-react";

export default async function EditorsChoicePage({ searchParams }) {
  const params = await searchParams;
  const selectedGenre = params.genre || "all";

  // Logic φιλτραρίσματος
  const filteredGames = selectedGenre === "all"
    ? games
    : games.filter((g) =>
        g.genres.some((genre) => genre.toLowerCase() === selectedGenre.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      
      {/* Compact Header */}
      <section className="relative py-10 border-b border-white/5 bg-gradient-to-b from-blue-900/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="mx-auto h-7 w-7 text-blue-500 mb-3 opacity-80" />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-2">
            Editor's <span className="text-blue-500">Choice</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto italic opacity-80">
            "The very best of gaming, handpicked for you."
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-bold tracking-tight uppercase">Featured Selections</h2>
          </div>
          
          <GameFilters currentGenre={selectedGenre} />
        </div>

        {/* Game Grid - Τώρα με το GameCard που έχει τα links! */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 font-medium">No games found for "{selectedGenre}".</p>
          </div>
        )}
      </main>
    </div>
  );
}
