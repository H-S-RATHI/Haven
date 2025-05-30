"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Crown, Check, CheckCheck } from "lucide-react"

const mockChats = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "Hey! How's your photography course going?",
    timestamp: "2:30 PM",
    unread: 2,
    isCreator: true,
    isOnline: true,
    messageStatus: "delivered" as const,
  },
  {
    id: 2,
    name: "Mike Chen",
    username: "mikec",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "Thanks for the hiking tips! 🏔️",
    timestamp: "1:45 PM",
    unread: 0,
    isCreator: false,
    isOnline: false,
    messageStatus: "read" as const,
  },
  {
    id: 3,
    name: "Alex Rivera",
    username: "alexr",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "Can't wait to hear your new track!",
    timestamp: "12:20 PM",
    unread: 1,
    isCreator: true,
    isOnline: true,
    messageStatus: "sent" as const,
  },
  {
    id: 4,
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "The makeup tutorial was amazing! ✨",
    timestamp: "11:30 AM",
    unread: 0,
    isCreator: true,
    isOnline: false,
    messageStatus: "read" as const,
  },
  {
    id: 5,
    name: "David Park",
    username: "davidp",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "Recipe shared! Try it out 🍝",
    timestamp: "Yesterday",
    unread: 0,
    isCreator: false,
    isOnline: true,
    messageStatus: "delivered" as const,
  },
]

export function MessagesTab() {
  return (
    <div className="h-full">
      {/* Search */}
      <div className="p-4 border-b bg-gray-50 dark:bg-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search chats..."
            className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            {/* Avatar */}
            <div className="relative mr-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {chat.isCreator && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />}
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
              )}
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{chat.name}</h3>
                  {chat.isCreator && (
                    <Badge variant="secondary" className="text-xs">
                      Creator
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{chat.timestamp}</span>
                  {chat.messageStatus === "sent" && <Check className="h-3 w-3 text-gray-400" />}
                  {chat.messageStatus === "delivered" && <CheckCheck className="h-3 w-3 text-gray-400" />}
                  {chat.messageStatus === "read" && <CheckCheck className="h-3 w-3 text-blue-500" />}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
