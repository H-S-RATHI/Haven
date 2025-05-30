"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, MoreHorizontal, Crown } from "lucide-react"

const mockPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "/placeholder.svg?height=40&width=40",
      isCreator: true,
      verified: true,
    },
    content:
      "Just launched my new photography course! 📸 So excited to share everything I've learned over the past 5 years. Link in my shop section!",
    image: "/placeholder.svg?height=300&width=500",
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: "2h ago",
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      username: "mikec",
      avatar: "/placeholder.svg?height=40&width=40",
      isCreator: false,
      verified: false,
    },
    content: "Beautiful sunset from my hike today! Nature never fails to amaze me 🌅",
    image: "/placeholder.svg?height=300&width=500",
    likes: 89,
    comments: 23,
    shares: 5,
    timestamp: "4h ago",
  },
  {
    id: 3,
    user: {
      name: "Alex Rivera",
      username: "alexr",
      avatar: "/placeholder.svg?height=40&width=40",
      isCreator: true,
      verified: true,
    },
    content: "New music video dropping tomorrow! Been working on this for months. Can't wait for you all to see it 🎵",
    likes: 567,
    comments: 89,
    shares: 34,
    timestamp: "6h ago",
  },
]

export function FeedTab() {
  return (
    <div className="space-y-6">
      {mockPosts.map((post) => (
        <Card key={post.id} className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {post.user.isCreator && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{post.user.name}</span>
                    {post.user.isCreator && (
                      <Badge variant="secondary" className="text-xs">
                        Creator
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>@{post.user.username}</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">{post.content}</p>
            {post.image && (
              <div className="rounded-lg overflow-hidden">
                <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-64 object-cover" />
              </div>
            )}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-6">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                  <Heart className="h-4 w-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                  <Share className="h-4 w-4 mr-2" />
                  {post.shares}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
