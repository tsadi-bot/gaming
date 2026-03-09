import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { RatingStars } from "@/components/rating-stars"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getGameById, games } from "@/lib/games"
import { ArrowLeft, Calendar, Building2, Users, Monitor, Star, MessageSquare, ThumbsUp } from "lucide-react"



export async function generateStaticParams() {
  return games.map((game) => ({
    id: game.id,
  }))
}

export default async function GamePage({ params }) {
  const { id } = await params
  const game = getGameById(id)

  if (!game) {
    notFound()
  }

  const mockReviews = [
    {
      id: 1,
      author: "GamerPro2024",
      rating: 9.5,
      content: "Absolutely incredible experience! The world design is breathtaking and the gameplay loop keeps you hooked for hundreds of hours.",
      likes: 234,
      date: "2 days ago"
    },
    {
      id: 2,
      author: "CasualPlayer",
      rating: 8.0,
      content: "Great game overall, though the difficulty can be challenging for newcomers. The story and characters are memorable.",
      likes: 156,
      date: "1 week ago"
    },
    {
      id: 3,
      author: "RPGEnthusiast",
      rating: 10,
      content: "A masterpiece in every sense of the word. This game sets a new standard for the genre.",
      likes: 512,
      date: "2 weeks ago"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
     

      {/* Hero Section with Cover */}
      <section className="relative">
        <div className="absolute inset-0 h-80 overflow-hidden">
          <Image
            src={game.screenshots[0]}
            alt={game.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="container relative mx-auto px-4 pt-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Games
          </Link>

          <div className="flex flex-col gap-8 pb-8 md:flex-row">
            {/* Cover Image */}
            <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-xl shadow-2xl md:w-72">
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Game Info */}
            <div className="flex flex-1 flex-col justify-end">
              <div className="mb-4 flex flex-wrap gap-2">
                {game.genres.map((genre) => (
                  <Badge key={genre} className="bg-primary/20 text-primary hover:bg-primary/30">
                    {genre}
                  </Badge>
                ))}
              </div>

              <h1 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {game.title}
              </h1>

              <p className="mb-6 text-pretty text-lg text-muted-foreground">
                {game.description}
              </p>

              <div className="mb-6 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <span className="text-2xl font-bold">{game.rating}</span>
                  </div>
                  <div>
                    <RatingStars rating={game.rating} size="sm" />
                    <p className="text-sm text-muted-foreground">
                      {game.reviewCount.toLocaleString()} reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="gap-2">
                  <Star className="h-5 w-5" />
                  Rate This Game
                </Button>
                <Button size="lg" variant="secondary" className="gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Write a Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {game.longDescription}
                </p>
              </CardContent>
            </Card>

            {/* Screenshots */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Screenshots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {game.screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-lg"
                    >
                      <Image
                        src={screenshot}
                        alt={`${game.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">User Reviews</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-medium text-foreground">
                          {review.author.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{review.author}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <Star className="h-4 w-4 fill-primary" />
                        <span className="font-semibold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="mb-3 text-muted-foreground">{review.content}</p>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{review.likes} found this helpful</span>
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Game Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Release Date</p>
                    <p className="font-medium text-foreground">{game.releaseDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Developer</p>
                    <p className="font-medium text-foreground">{game.developer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Publisher</p>
                    <p className="font-medium text-foreground">{game.publisher}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Platforms</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {game.platforms.map((platform) => (
                        <Badge key={platform} variant="secondary">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating Distribution */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { stars: 5, percentage: 65 },
                  { stars: 4, percentage: 20 },
                  { stars: 3, percentage: 10 },
                  { stars: 2, percentage: 3 },
                  { stars: 1, percentage: 2 }
                ].map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="w-4 text-sm text-muted-foreground">{item.stars}</span>
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-sm text-muted-foreground">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
