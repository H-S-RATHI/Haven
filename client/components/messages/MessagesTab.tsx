"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Crown, Check, CheckCheck } from "lucide-react"
import { useChat } from "@/features/chat/ChatContext"
import { format } from "date-fns"

export function MessagesTab() {
  const { conversations, currentConversation, selectConversation, startNewChat } = useChat()
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true
    return conv.participants.some(participant => 
      participant.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString)
    return format(date, 'h:mm a')
  }

  const handleConversationClick = (conversationId: string) => {
    selectConversation(conversationId)
    // Update URL to reflect the selected conversation
    router.push(`/world?conversation=${conversationId}`, { scroll: false })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b bg-gray-50 dark:bg-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search chats..."
            className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-500 dark:text-gray-400">
            <p>No conversations found</p>
            <p className="text-sm mt-2">Start a new chat by clicking the + button</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const otherParticipants = conversation.participants.filter(p => p !== 'currentUserId') // Assuming current user ID is in the participants
            const displayName = otherParticipants.join(', ') || 'Group Chat'
            const lastMessage = conversation.lastMessage
            
            return (
              <div
                key={conversation.id}
                className={`flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                  currentConversation?.id === conversation.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
                onClick={() => handleConversationClick(conversation.id)}
              >
                {/* Avatar */}
                <div className="relative mr-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {displayName}
                    </h3>
                    {lastMessage && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                        {formatTime(lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {lastMessage?.content || 'No messages yet'}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
