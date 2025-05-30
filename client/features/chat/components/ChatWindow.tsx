'use client';

import { useChat } from '../ChatContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, formatDistanceToNow } from 'date-fns';
import { MessageInput } from './MessageInput';
import { useMemo, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '../types';

export function ChatWindow() {
  const { currentConversation, messages, typingUsers } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: Message[] }[] = [];
    
    messages.forEach((message) => {
      const date = format(new Date(message.timestamp), 'yyyy-MM-dd');
      const lastGroup = groups[groups.length - 1];
      
      if (lastGroup && lastGroup.date === date) {
        lastGroup.messages.push(message);
      } else {
        groups.push({
          date,
          messages: [message]
        });
      }
    });
    
    return groups;
  }, [messages]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Get typing users for current conversation
  const currentTypingUsers = useMemo(() => {
    if (!currentConversation) return [];
    return Object.entries(typingUsers)
      .filter(([userId, isTyping]) => 
        isTyping && 
        currentConversation.participants.includes(userId) &&
        userId !== currentConversation.participants[0] // Don't show current user's typing indicator
      )
      .map(([userId]) => userId);
  }, [typingUsers, currentConversation]);
  
  // Format message time
  const formatMessageTime = (date: Date) => {
    return format(new Date(date), 'h:mm a');
  };
  
  // Format date header
  const formatDateHeader = (date: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');
    
    if (date === today) return 'Today';
    if (date === yesterday) return 'Yesterday';
    return format(new Date(date), 'MMMM d, yyyy');
  };

  if (!currentConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-6 max-w-md">
          <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select a conversation or start a new chat
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={`/avatars/${currentConversation.id}.jpg`} />
            <AvatarFallback>
              {currentConversation.participants[0]?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">
              {currentConversation.participants.join(', ')}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentConversation.lastMessage
                ? `Last seen ${format(new Date(currentConversation.lastMessage.timestamp), 'p')}`
                : 'Active now'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {groupedMessages.map((group) => (
          <div key={group.date} className="space-y-4">
            <div className="relative flex justify-center">
              <div className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full">
                {formatDateHeader(group.date)}
              </div>
            </div>
            
            <div className="space-y-4">
              {group.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.sender === currentConversation.participants[0] 
                      ? 'justify-start' 
                      : 'justify-end'
                  )}
                >
                  <div className="max-w-xs lg:max-w-md">
                    <div
                      className={cn(
                        'px-4 py-2 rounded-lg',
                        message.sender === currentConversation.participants[0]
                          ? 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                          : 'bg-blue-500 text-white rounded-tr-none'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p 
                        className={cn(
                          'text-xs mt-1 text-right',
                          message.sender === currentConversation.participants[0]
                            ? 'text-gray-500 dark:text-gray-400'
                            : 'text-blue-100 opacity-80'
                        )}
                      >
                        {formatMessageTime(new Date(message.timestamp))}
                        {message.sender !== currentConversation.participants[0] && (
                          <span className="ml-1">
                            {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓' : ''}
                          </span>
                        )}
                      </p>
                    </div>
                    {message.sender === currentConversation.participants[0] && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Typing indicators */}
        {currentTypingUsers.length > 0 && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            </div>
            <div className="flex space-x-1">
              {currentTypingUsers.map((userId) => (
                <div 
                  key={userId} 
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                >
                  {userId} is typing...
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <MessageInput />
      </div>
    </div>
  );
}