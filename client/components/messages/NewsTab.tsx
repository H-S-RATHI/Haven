"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, ExternalLink, TrendingUp } from "lucide-react"

const mockNews = [
  {
    id: 1,
    title: "Tech Giants Announce New AI Safety Standards",
    summary: "Major technology companies have agreed on new guidelines for AI development and deployment...",
    source: "TechNews",
    timestamp: "2 hours ago",
    factCheckScore: 95,
    category: "Technology",
    isBreaking: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Historic Agreement",
    summary: "World leaders have signed a comprehensive climate action plan targeting carbon neutrality...",
    source: "Global Times",
    timestamp: "4 hours ago",
    factCheckScore: 92,
    category: "Environment",
    isBreaking: false,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "New Social Media Platform Gains 10M Users",
    summary: "A new messaging and social platform has reached 10 million users in just 3 months...",
    source: "Social Media Today",
    timestamp: "6 hours ago",
    factCheckScore: 88,
    category: "Social Media",
    isBreaking: false,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Breakthrough in Quantum Computing Research",
    summary: "Scientists have achieved a new milestone in quantum computing that could revolutionize...",
    source: "Science Daily",
    timestamp: "8 hours ago",
    factCheckScore: 97,
    category: "Science",
    isBreaking: false,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const trendingTopics = [
  { tag: "AI Safety", posts: "15.2K" },
  { tag: "Climate Action", posts: "12.8K" },
  { tag: "Quantum Computing", posts: "8.9K" },
  { tag: "Social Media", posts: "22.1K" },
]

export function NewsTab() {
  const getFactCheckIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-4 w-4 text-green-500" />
    if (score >= 70) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    return <AlertTriangle className="h-4 w-4 text-red-500" />
  }

  const getFactCheckColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 dark:bg-green-900/20"
    if (score >= 70) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
    return "text-red-600 bg-red-50 dark:bg-red-900/20"
  }

  return (
    <div className="h-full">
      {/* Breaking News Banner */}
      <div className="bg-red-500 text-white p-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="font-semibold text-sm">BREAKING</span>
          <span className="text-sm">Tech Giants Announce New AI Safety Standards</span>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="p-4 border-b bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Trending Now</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <Badge
              key={topic.tag}
              variant="secondary"
              className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              #{topic.tag} • {topic.posts}
            </Badge>
          ))}
        </div>
      </div>

      {/* News Feed */}
      <div className="p-4 space-y-4">
        {mockNews.map((article) => (
          <Card key={article.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <div className="flex">
                {/* Article Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </div>

                {/* Article Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      {article.isBreaking && <Badge className="bg-red-500 hover:bg-red-600 text-xs">Breaking</Badge>}
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>

                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{article.title}</h3>

                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{article.summary}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{article.source}</span>
                      <span>•</span>
                      <span>{article.timestamp}</span>
                    </div>

                    {/* Fact Check Score */}
                    <div
                      className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getFactCheckColor(article.factCheckScore)}`}
                    >
                      {getFactCheckIcon(article.factCheckScore)}
                      <span className="font-medium">{article.factCheckScore}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="p-4 text-center">
        <Button variant="outline" className="w-full">
          Load More News
        </Button>
      </div>
    </div>
  )
}
