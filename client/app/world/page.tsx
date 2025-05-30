"use client"

import { useState } from "react"
import { MessagesTab } from "@/components/messages/MessagesTab"
import { StatusTab } from "@/components/messages/StatusTab"
import { NewsTab } from "@/components/messages/NewsTab"
import { FeedTab } from "@/components/world/FeedTab"
import { ReelsTab } from "@/components/world/ReelsTab"
import { ExploreTab } from "@/components/world/ExploreTab"
import { ProfileTab } from "@/components/world/ProfileTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Globe } from 'lucide-react'
import { useAuth } from "@/features/auth/useAuth"

export default function WorldPage() {
  const { user } = useAuth()
  const isCreator = user?.accountType === "creator"
  const [activeMainTab, setActiveMainTab] = useState("messages")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with User Info and Logout */}
      <div className="bg-green-600 dark:bg-green-700 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">SocialApp</h1>
          <div className="flex items-center space-x-4">
            {user && (
              <span className="hidden sm:inline text-sm font-medium">
                Welcome, {user.fullName}
              </span>
            )}
            <button
              onClick={() => {
                // This will be handled by the AuthProvider
                const event = new CustomEvent('logout');
                window.dispatchEvent(event);
              }}
              className="px-3 py-1.5 text-sm bg-white/20 hover:bg-white/30 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Main Tab Navigation */}
        <div className="bg-green-600 dark:bg-green-700 text-white">
          <div className="flex">
            <button
              onClick={() => setActiveMainTab("messages")}
              className={`flex-1 flex items-center justify-center py-3 px-4 ${
                activeMainTab === "messages" 
                  ? "bg-green-700 dark:bg-green-800 border-b-2 border-white" 
                  : "hover:bg-green-700 dark:hover:bg-green-800"
              }`}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Messages
            </button>
            <button
              onClick={() => setActiveMainTab("world")}
              className={`flex-1 flex items-center justify-center py-3 px-4 ${
                activeMainTab === "world" 
                  ? "bg-green-700 dark:bg-green-800 border-b-2 border-white" 
                  : "hover:bg-green-700 dark:hover:bg-green-800"
              }`}
            >
              <Globe className="w-5 h-5 mr-2" />
              World
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 min-h-screen">
          {activeMainTab === "messages" && (
            <Tabs defaultValue="chats" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-700 rounded-none">
                <TabsTrigger value="chats" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  Chats
                </TabsTrigger>
                <TabsTrigger value="status" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  Status
                </TabsTrigger>
                <TabsTrigger value="news" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  News
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chats" className="p-0">
                <MessagesTab />
              </TabsContent>

              <TabsContent value="status" className="p-0">
                <StatusTab />
              </TabsContent>

              <TabsContent value="news" className="p-0">
                <NewsTab />
              </TabsContent>
            </Tabs>
          )}

          {activeMainTab === "world" && (
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className={`grid w-full ${isCreator ? 'grid-cols-4' : 'grid-cols-3'} bg-gray-100 dark:bg-gray-700 rounded-none`}>
                <TabsTrigger value="feed" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  Feed
                </TabsTrigger>
                <TabsTrigger value="reels" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  Reels
                </TabsTrigger>
                <TabsTrigger value="explore" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  Explore
                </TabsTrigger>
                {isCreator && (
                  <TabsTrigger value="profile" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    Profile
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="feed" className="p-4">
                <FeedTab />
              </TabsContent>

              <TabsContent value="reels" className="p-4">
                <ReelsTab />
              </TabsContent>

              <TabsContent value="explore" className="p-4">
                <ExploreTab />
              </TabsContent>

              {isCreator && (
                <TabsContent value="profile" className="p-4">
                  <ProfileTab />
                </TabsContent>
              )}
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}
