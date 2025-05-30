"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Eye, Heart, Share, Calendar, ExternalLink, Plus, Crown } from "lucide-react"

const analyticsData = [
  { name: "Mon", followers: 1200, engagement: 85 },
  { name: "Tue", followers: 1250, engagement: 92 },
  { name: "Wed", followers: 1180, engagement: 78 },
  { name: "Thu", followers: 1320, engagement: 95 },
  { name: "Fri", followers: 1450, engagement: 88 },
  { name: "Sat", followers: 1380, engagement: 102 },
  { name: "Sun", followers: 1520, engagement: 110 },
]

const engagementData = [
  { name: "Likes", value: 65, color: "#ef4444" },
  { name: "Comments", value: 20, color: "#3b82f6" },
  { name: "Shares", value: 15, color: "#10b981" },
]

const shopLinks = [
  {
    id: 1,
    title: "Photography Course",
    url: "https://example.com/course",
    thumbnail: "/placeholder.svg?height=100&width=100",
    price: "$99",
  },
  {
    id: 2,
    title: "Lightroom Presets",
    url: "https://example.com/presets",
    thumbnail: "/placeholder.svg?height=100&width=100",
    price: "$29",
  },
  {
    id: 3,
    title: "Print Shop",
    url: "https://example.com/prints",
    thumbnail: "/placeholder.svg?height=100&width=100",
    price: "From $15",
  },
]

export function ProfileTab() {
  return (
    <div className="space-y-6">
      {/* Creator Badge */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Creator Dashboard</h3>
                <p className="text-sm text-muted-foreground">Manage your content, analytics, and shop links</p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
            >
              <Crown className="w-3 h-3 mr-1" />
              Creator Mode Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="shop">Shop Links</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Followers</p>
                    <p className="text-2xl font-bold">12.5K</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +5.2% this week
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
                    <p className="text-2xl font-bold">45.2K</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12.1% this week
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Engagement</p>
                    <p className="text-2xl font-bold">8.9%</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +2.3% this week
                    </p>
                  </div>
                  <Heart className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Shares</p>
                    <p className="text-2xl font-bold">1.2K</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +8.7% this week
                    </p>
                  </div>
                  <Share className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Follower Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="followers" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Engagement */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="engagement" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shop" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Shop Links</h3>
              <p className="text-sm text-muted-foreground">Manage up to 10 product/service links</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shopLinks.map((link) => (
              <Card key={link.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <img
                      src={link.thumbnail || "/placeholder.svg"}
                      alt={link.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium">{link.title}</h4>
                      <p className="text-sm text-muted-foreground">{link.price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" className="flex-1 mr-2">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add new link card */}
            <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-4 h-full flex items-center justify-center">
                <div className="text-center">
                  <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Add new link</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Post Scheduler</h3>
              <p className="text-sm text-muted-foreground">Schedule posts up to 7 days in advance</p>
            </div>
            <Button>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Post
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2">No scheduled posts</h4>
                <p className="text-muted-foreground mb-4">Create your first scheduled post to see it here</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Your First Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
