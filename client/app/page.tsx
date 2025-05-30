"use client"

import { useAuth } from "@/features/auth/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Users, MessageCircle, Globe, Star, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/world")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect to /world
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SocialApp</span>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4" variant="secondary">
            <Star className="w-4 h-4 mr-1" />
            Now with Creator Mode
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Connect, Create, and Share Your World
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the next generation social platform where creators thrive and communities flourish. Share stories,
            connect with friends, and discover amazing content.
          </p>
          <div className="space-x-4">
            <Link href="/signup">
              <Button size="lg" className="px-8">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="px-8">
                Welcome Back
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From casual sharing to professional creating, we've got the tools to help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
            <CardHeader>
              <Users className="w-10 h-10 text-blue-500 mb-2" />
              <CardTitle>Social Feed</CardTitle>
              <CardDescription>Stay connected with friends through our intelligent feed algorithm</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Personalized content discovery</li>
                <li>• Real-time updates</li>
                <li>• Privacy controls</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
            <CardHeader>
              <MessageCircle className="w-10 h-10 text-green-500 mb-2" />
              <CardTitle>Secure Messaging</CardTitle>
              <CardDescription>End-to-end encrypted messaging with voice and video calls</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• E2E encryption</li>
                <li>• Group calls up to 8 people</li>
                <li>• Media sharing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
            <CardHeader>
              <Globe className="w-10 h-10 text-purple-500 mb-2" />
              <CardTitle>Stories & Reels</CardTitle>
              <CardDescription>Share moments that matter with interactive stories and short videos</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 45-second video stories</li>
                <li>• Interactive stickers</li>
                <li>• Story highlights</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
            <CardHeader>
              <Shield className="w-10 h-10 text-orange-500 mb-2" />
              <CardTitle>AI-Verified News</CardTitle>
              <CardDescription>Stay informed with fact-checked news and real-time updates</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Fact-check scores</li>
                <li>• Custom filters</li>
                <li>• Breaking news alerts</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-10 h-10 text-yellow-500" />
                <Badge variant="secondary">Creator</Badge>
              </div>
              <CardTitle>Creator Mode</CardTitle>
              <CardDescription>Unlock professional tools and monetization features</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Analytics dashboard</li>
                <li>• Shop links integration</li>
                <li>• Unlimited boosts</li>
                <li>• Priority support</li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  One-time $1,000 activation fee
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
            <CardHeader>
              <Star className="w-10 h-10 text-pink-500 mb-2" />
              <CardTitle>Premium Features</CardTitle>
              <CardDescription>Advanced tools for power users and content creators</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Story scheduling</li>
                <li>• Broadcast lists</li>
                <li>• Auto-reply bots</li>
                <li>• Advanced analytics</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of users already sharing their stories</p>
            <div className="space-x-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="px-8">
                  Create Account
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 text-white border-white hover:bg-white hover:text-blue-600"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
              <span className="font-semibold">SocialApp</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2024 SocialApp. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
