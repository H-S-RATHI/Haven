"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, Play, Crown } from "lucide-react"

const mockReels = [
  {
    id: 1,
    user: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "/placeholder.svg?height=40&width=40",
      isCreator: true,
    },
    title: "Quick makeup tutorial ✨",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:45",
    likes: 1234,
    comments: 89,
    shares: 45,
  },
  {
    id: 2,
    user: {
      name: "David Park",
      username: "davidp",
      avatar: "/placeholder.svg?height=40&width=40",
      isCreator: false,
    },
    title: "Cooking the perfect pasta 🍝",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:32",
    likes: 567,
    comments: 34,
    shares: 23,
  },
  {
    id: 3,
    user: {
      name: "Lisa Chang",
      username: "lisac",
      avatar: "/placeholder.svg?height=40&width=40",
      isCreator: true,
    },
    title: "Dance challenge! Who's next? 💃",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:28",
    likes: 2345,
    comments: 156,
    shares: 78,
  },
]

export function ReelsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockReels.map((reel) => (
        <Card key={reel.id} className="border-0 shadow-sm overflow-hidden group cursor-pointer">
          <div className="relative">
            <img
              src={reel.thumbnail || "/placeholder.svg"}
              alt={reel.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {reel.duration}
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={reel.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{reel.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {reel.user.isCreator && <Crown className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500" />}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{reel.user.name}</span>
                  {reel.user.isCreator && (
                    <Badge variant="secondary" className="text-xs">
                      Creator
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">@{reel.user.username}</span>
              </div>
            </div>
            <p className="text-sm mb-3">{reel.title}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  {reel.likes}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {reel.comments}
                </span>
                <span className="flex items-center">
                  <Share className="h-3 w-3 mr-1" />
                  {reel.shares}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
