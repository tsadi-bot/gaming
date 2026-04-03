"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function GameFilters({ currentGenre }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleGenreChange = (e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value === "all") {
      params.delete("genre");
    } else {
      params.set("genre", e.target.value);
    }
    // Σπρώχνει τη νέα παράμετρο στο URL και το Server Component ενημερώνεται αυτόματα
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4">
      <select
        value={currentGenre}
        onChange={handleGenreChange}
        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
      >
        <option value="all">All Genres</option>
        <option value="action">Action</option>
        <option value="rpg">RPG</option>
        <option value="strategy">Strategy</option>
        <option value="shooter">Shooter</option>
      </select>
    </div>
  );
}
