import { Mail, MessageSquare, Twitter, Github, Send } from "lucide-react"

export const metadata = {
  title: "Contact - GameRate",
  description: "Get in touch with the GameRate team. We'd love to hear from you.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      

      {/* Hero */}
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

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">

          {/* Contact Form */}
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="mb-6 flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Send a Message</h2>
            </div>
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="h-10 rounded-lg border border-border bg-secondary px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-10 rounded-lg border border-border bg-secondary px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="What's this about?"
                  className="h-10 rounded-lg border border-border bg-secondary px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="resize-none rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Info Panel */}
          <div className="flex flex-col gap-8">
            {/* Direct Contact */}
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="mb-6 flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Direct Contact</h2>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground">General Inquiries</span>
                  <a
                    href="mailto:hello@gamerate.gg"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    hello@gamerate.gg
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground">Business &amp; Press</span>
                  <a
                    href="mailto:press@gamerate.gg"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    press@gamerate.gg
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground">Bug Reports</span>
                  <a
                    href="mailto:bugs@gamerate.gg"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    bugs@gamerate.gg
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="mb-6 text-xl font-bold text-foreground">Find Us Online</h2>
              <div className="flex flex-col gap-4">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Twitter className="h-4 w-4" />
                  @GameRateGG on X
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  github.com/gamerate
                </a>
              </div>
            </div>

            {/* Response time */}
            <p className="text-sm text-muted-foreground">
              We typically respond within <span className="text-foreground font-medium">24–48 hours</span>. For urgent matters, reach out directly via email.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <a href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Contact
              </a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
