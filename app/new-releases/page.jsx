import { games } from "@/lib/games";
import GameCard from "@/components/game-card";
import PageHeader from "@/components/PageHeader";
import { Calendar, Rocket } from "lucide-react";

export default function NewReleasesPage() {
  
  // Logic για να ταξινομήσουμε τα παιχνίδια από το πιο νέο στο πιο παλιό
  const newGames = [...games].sort((a, b) => {
    return new Date(b.releaseDate) - new Date(a.releaseDate);
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      
      {/* Page Header με το δικό του τίτλο */}
      <PageHeader 
        title="New" 
        highlight="Releases" 
        subtitle="Fresh out of the oven. Discover the latest hits and upcoming masterpieces." 
      />

      <main className="container mx-auto px-4 py-12">
        
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-10 border-l-4 border-blue-600 pl-4">
          <Rocket className="w-6 h-6 text-blue-500" />
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tight">Just Landed</h2>
            <p className="text-xs text-zinc-500 font-medium">Updated every week</p>
          </div>
        </div>

        {/* Grid των νέων κυκλοφοριών */}
        {newGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {newGames.map((game) => (
              <div key={game.id} className="relative">
                {/* Badge για "NEW" πάνω στην κάρτα */}
                <div className="absolute -top-2 -left-2 z-20 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg transform -rotate-12 border border-blue-400 uppercase tracking-tighter">
                  New
                </div>
                
                <GameCard game={game} />
                
                {/* Ημερομηνία κυκλοφορίας κάτω από την κάρτα */}
                <div className="mt-3 flex items-center gap-2 text-zinc-500 text-[10px] uppercase font-bold tracking-widest pl-1">
                  <Calendar className="w-3 h-3 text-blue-500/50" />
                  Released: {game.releaseDate}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-50">
            <p>No recent releases found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
