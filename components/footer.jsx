import React from 'react'

const Footer = () => {
  return (
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              GameRate - Your trusted source for game reviews and ratings.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                About
              </a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Contact
              </a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
