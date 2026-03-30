'use client'

import Link from "next/link";
import { Gamepad2, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from 'react';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Απαραίτητο για να αποφύγουμε hydration mismatch στο dark mode icon
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-colors hover:opacity-80">
          <Gamepad2 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">GameRate</span>
        </Link>

        {/* Navigation - Διορθωμένα Links */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/top-rated" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Top Rated
          </Link>
          <Link href="/new-releases" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            New Releases
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
           Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search games..."
              className="h-9 w-64 rounded-lg border border-border bg-secondary pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted && (
              theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500 transition-all" />
              ) : (
                <Moon className="h-5 w-5 text-slate-900 transition-all" />
              )
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
