'use client';

import { useChat } from '../ChatContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export function ChatList() {
  const { conversations, currentConversation, selectConversation } = useChat();

  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${
              currentConversation?.id === conversation.id ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            onClick={() => selectConversation(conversation.id)}
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={`/avatars/${conversation.id}.jpg`} />
                <AvatarFallback>{conversation.participants[0]?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium truncate">
                    {conversation.participants.join(', ')}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {conversation.lastMessage && format(new Date(conversation.lastMessage.timestamp), 'p')}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {conversation.lastMessage?.content || 'No messages yet'}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <Badge className="ml-2" variant="destructive">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
