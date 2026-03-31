"use client"

import React, { useState } from "react"
import { Mail, MessageSquare, Twitter, Github, Send, Loader2, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Λογική αποστολής φόρμας
  async function handleSubmit(formData) {
    setIsSubmitting(true)
    
    // Εδώ προσομοιώνουμε μια καθυστέρηση δικτύου 1.5 δευτερολέπτου
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    // Εδώ θα έμπαινε η κλήση στο backend/API σου
    console.log("Τα δεδομένα στάλθηκαν:", data)
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Επαναφορά της φόρμας μετά από 5 δευτερόλεπτα
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Have a question, suggestion, or just want to say hello? We&apos;re here for it.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 flex-grow">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          
          {/* Contact Form Container */}
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Send a Message</h2>
            </div>

            {isSuccess ? (
              <div className="flex h-[400px] flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
                <h3 className="text-lg font-semibold text-foreground">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">We&apos;ll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-sm text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form action={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="h-10 rounded-lg border border-border bg-secondary/50 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="h-10 rounded-lg border border-border bg-secondary/50 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What's this about?"
                    className="h-10 rounded-lg border border-border bg-secondary/50 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us what's on your mind..."
                    className="resize-none rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Panel */}
          <div className="flex flex-col gap-8 text-left">
            {/* Direct Contact */}
            <div className="rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Direct Contact</h2>
              </div>
              
              <div className="grid gap-6 text-left">
                {[
                  { label: "General Inquiries", email: "hello@gamerate.gg" },
                  { label: "Business & Press", email: "press@gamerate.gg" },
                  { label: "Bug Reports", email: "bugs@gamerate.gg" }
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </span>
                    <a
                      href={`mailto:${item.email}`}
                      className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {item.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50">
              <h2 className="mb-6 text-xl font-bold text-foreground">Find Us Online</h2>
              <div className="flex flex-col gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary hover:text-primary"
                >
                  <Twitter className="h-4 w-4" />
                  @GameRateGG on X
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  ://github.com
                </a>
              </div>
            </div>

            {/* Response info */}
            <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4 border border-primary/10">
              <div className="mt-0.5 text-primary">
                <MessageSquare className="h-4 w-4" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We typically respond within <span className="font-semibold text-foreground">24–48 hours</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Game<span className="text-primary">Rate</span>
              </span>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                Your trusted source for game reviews and ratings.
              </p>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {["About", "Contact", "Privacy", "Terms"].map((item) => (
                <a 
                  key={item}
                  href={`/${item.toLowerCase()}`} 
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="mt-12 border-t border-border/50 pt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} GameRate. Made with ❤️ for gamers.
          </div>
        </div>
      </footer>
    </div>
  )
}
