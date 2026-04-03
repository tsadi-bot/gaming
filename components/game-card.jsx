"use client";

import { Star, ArrowRight } from "lucide-react";
import Link from "next/link"; // Εισαγωγή του Link

export default function GameCard({ game }) {
  return (
    // Τυλίγουμε όλη την κάρτα με Link για να είναι clickable παντού
    <Link href={`/game/${game.id}`} className="group block h-full">
      <div className="relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 group-hover:border-blue-500/40 group-hover:shadow-[0_10px_40px_-15px_rgba(59,130,246,0.3)] transition-all duration-500 flex flex-col h-full">
        
        {/* Image Container */}
        <div className="aspect-[16/9] overflow-hidden bg-zinc-900 relative">
          <img 
            src={game.coverImage} 
            alt={game.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-xl">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-blue-400 text-xs font-black tracking-tighter">{game.rating}</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-3">
            <h3 className="font-bold text-lg leading-tight text-white group-hover:text-blue-400 transition-colors duration-300 truncate">
              {game.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {game.genres?.slice(0, 2).map((genre, index) => (
                <span key={index} className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <p className="text-zinc-400 text-xs line-clamp-2 mb-5 leading-relaxed flex-grow">
            {game.description}
          </p>

          {/* Το κουμπί τώρα είναι ένα div που μοιάζει με κουμπί, αφού το Link είναι εξωτερικά */}
          <div className="w-full py-2.5 bg-blue-600/10 group-hover:bg-blue-600 text-blue-400 group-hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border border-blue-600/20 group-hover:border-blue-600 flex items-center justify-center gap-2">
            View Details
            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
