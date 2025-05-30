"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Crown } from "lucide-react"

const mockStatuses = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "/placeholder.svg?height=50&width=50",
    timestamp: "2 hours ago",
    isCreator: true,
    hasViewed: false,
    statusCount: 3,
  },
  {
    id: 2,
    name: "Mike Chen",
    username: "mikec",
    avatar: "/placeholder.svg?height=50&width=50",
    timestamp: "4 hours ago",
    isCreator: false,
    hasViewed: true,
    statusCount: 1,
  },
  {
    id: 3,
    name: "Alex Rivera",
    username: "alexr",
    avatar: "/placeholder.svg?height=50&width=50",
    timestamp: "6 hours ago",
    isCreator: true,
    hasViewed: false,
    statusCount: 2,
  },
  {
    id: 4,
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "/placeholder.svg?height=50&width=50",
    timestamp: "8 hours ago",
    isCreator: true,
    hasViewed: true,
    statusCount: 4,
  },
]

export function StatusTab() {
  return (
    <div className="h-full">
      {/* My Status */}
      <div className="p-4 border-b bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center">
          <div className="relative mr-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=50&width=50" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-700 flex items-center justify-center">
              <Plus className="h-3 w-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">My Status</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Tap to add status update</p>
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
          Recent Updates
        </h4>

        <div className="space-y-3">
          {mockStatuses.map((status) => (
            <div
              key={status.id}
              className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
            >
              {/* Status Avatar with Ring */}
              <div className="relative mr-3">
                <div
                  className={`p-0.5 rounded-full ${
                    status.hasViewed ? "bg-gray-300 dark:bg-gray-600" : "bg-gradient-to-r from-green-400 to-green-600"
                  }`}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={status.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{status.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                {status.isCreator && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />}
              </div>

              {/* Status Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{status.name}</h3>
                  {status.isCreator && (
                    <Badge variant="secondary" className="text-xs">
                      Creator
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{status.timestamp}</p>
              </div>

              {/* Status Count */}
              {status.statusCount > 1 && (
                <div className="text-xs text-gray-500 dark:text-gray-400">{status.statusCount} updates</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Viewed Updates */}
      <div className="p-4 border-t">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
          Viewed Updates
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No viewed updates yet</p>
      </div>
    </div>
  )
}
