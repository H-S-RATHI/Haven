"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Hash, Users, Search, Crown, Plus } from "lucide-react"

const trendingHashtags = [
  { tag: "photography", posts: "12.5K" },
  { tag: "cooking", posts: "8.9K" },
  { tag: "travel", posts: "15.2K" },
  { tag: "fitness", posts: "6.7K" },
  { tag: "art", posts: "9.3K" },
]

const suggestedUsers = [
  {
    name: "Jessica Martinez",
    username: "jessicam",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "12.5K",
    isCreator: true,
    bio: "Travel photographer & content creator",
  },
  {
    name: "Ryan Thompson",
    username: "ryant",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "8.9K",
    isCreator: false,
    bio: "Food enthusiast & home chef",
  },
  {
    name: "Maya Patel",
    username: "mayap",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "15.2K",
    isCreator: true,
    bio: "Fitness coach & wellness advocate",
  },
]

const trendingPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=200&width=200",
    likes: 1234,
    comments: 89,
  },
  {
    id: 2,
    image: "/placeholder.svg?height=200&width=200",
    likes: 567,
    comments: 34,
  },
  {
    id: 3,
    image: "/placeholder.svg?height=200&width=200",
    likes: 890,
    comments: 56,
  },
  {
    id: 4,
    image: "/placeholder.svg?height=200&width=200",
    likes: 2345,
    comments: 123,
  },
  {
    id: 5,
    image: "/placeholder.svg?height=200&width=200",
    likes: 678,
    comments: 45,
  },
  {
    id: 6,
    image: "/placeholder.svg?height=200&width=200",
    likes: 1567,
    comments: 78,
  },
]

export function ExploreTab() {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search hashtags, users, or content..." className="pl-10" />
      </div>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {trendingPosts.map((post) => (
              <div key={post.id} className="relative group cursor-pointer">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Trending post"
                  className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-lg" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-sm">
                  <div className="flex justify-between items-center">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hashtags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Trending Hashtags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingHashtags.map((hashtag, index) => (
                <div
                  key={hashtag.tag}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Hash className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">#{hashtag.tag}</span>
                      <p className="text-sm text-muted-foreground">{hashtag.posts} posts</p>
                    </div>
                  </div>
                  <Badge variant="secondary">#{index + 1}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="people" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Suggested for You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedUsers.map((user) => (
                <div key={user.username} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {user.isCreator && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{user.name}</span>
                        {user.isCreator && (
                          <Badge variant="secondary" className="text-xs">
                            Creator
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                      <p className="text-sm text-muted-foreground">{user.bio}</p>
                      <p className="text-xs text-muted-foreground">{user.followers} followers</p>
                    </div>
                  </div>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
