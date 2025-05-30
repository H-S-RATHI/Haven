'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../auth/useAuth';
import { User, Message, Conversation, SocketEvents } from './types';

interface ChatContextType {
  socket: Socket | null;
  isConnected: boolean;
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  typingUsers: Record<string, boolean>;
  sendMessage: (content: string) => void;
  selectConversation: (conversationId: string) => void;
  startNewChat: (userId: string) => void;
  setTyping: (isTyping: boolean) => void;
  markAsRead: (messageIds: string[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});

  // Initialize socket connection
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', {
      auth: {
        token,
        userId: user.id
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
      
      // Join user's personal room
      newSocket.emit('join:user', user.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    });

    // Listen for new messages
    newSocket.on('message:new', (message: Message) => {
      setMessages(prev => [...prev, message]);
      // Update last message in conversations
      setConversations(prev => 
        prev.map(conv => 
          conv.id === message.conversationId
            ? { ...conv, lastMessage: message }
            : conv
        )
      );
    });

    // Listen for typing indicators
    newSocket.on('user:typing', ({ userId, isTyping }) => {
      setTypingUsers(prev => ({
        ...prev,
        [userId]: isTyping
      }));
    });

    // Listen for user status changes
    newSocket.on('user:status', ({ userId, status }) => {
      // Update user status in the UI if needed
      console.log(`User ${userId} is now ${status}`);
    });

    // Load initial data
    const loadInitialData = async () => {
      try {
        // Fetch conversations from your API
        const response = await fetch('/api/conversations', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }
        
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    };

    loadInitialData();

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  const sendMessage = useCallback(async (content: string) => {
    if (!currentConversation || !socket || !user) return;

    const message: Omit<Message, 'id' | 'timestamp' | 'status'> = {
      content,
      sender: user.id,
      conversationId: currentConversation.id,
    };

    socket.emit('message:send', message);
    
    // Reset typing indicator
    setTyping(false);
  }, [socket, currentConversation, user]);
  
  const setTyping = useCallback((isTyping: boolean) => {
    if (!socket || !currentConversation || !user) return;
    
    socket.emit('user:typing', {
      conversationId: currentConversation.id,
      userId: user.id,
      isTyping
    });
  }, [socket, currentConversation, user]);
  
  const markAsRead = useCallback(async (messageIds: string[]) => {
    if (!socket || !user || !currentConversation) return;
    
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    
    try {
      // Update server
      const response = await fetch(`/api/conversations/${currentConversation.id}/messages/read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ messageIds }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark messages as read');
      }
      
      // Emit socket event
      socket.emit('message:read', { 
        messageIds,
        conversationId: currentConversation.id,
        readerId: user.id 
      });
      
      // Update local state
      setMessages(prev => 
        prev.map(msg => 
          messageIds.includes(msg.id) && msg.sender !== user.id
            ? { ...msg, status: 'read' as const }
            : msg
        )
      );
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }, [socket, user, currentConversation]);

  const selectConversation = useCallback(async (conversationId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
      
      try {
        // Fetch messages for this conversation
        const response = await fetch(`/api/conversations/${conversationId}/messages`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        
        const messages = await response.json();
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  }, [conversations]);

  const startNewChat = useCallback(async (userId: string) => {
    const token = localStorage.getItem('token');
    if (!token || !user) {
      console.error('Authentication required');
      return;
    }

    // Check if conversation already exists
    const existingConversation = conversations.find(conv => 
      conv.participants.includes(userId)
    );

    if (existingConversation) {
      selectConversation(existingConversation.id);
      return;
    }

    try {
      // Create new conversation on the server
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          participantIds: [userId]
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create conversation');
      }

      const newConversation = await response.json();
      
      // Update local state
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversation(newConversation);
      setMessages([]);
      
    } catch (error) {
      console.error('Error creating conversation:', error);
      // Fallback to local state if server creation fails
      const tempConversation: Conversation = {
        id: 'temp-' + Date.now(),
        participants: [user.id, userId],
        lastMessage: null,
        unreadCount: 0
      };
      
      setConversations(prev => [tempConversation, ...prev]);
      setCurrentConversation(tempConversation);
      setMessages([]);
    }
  }, [conversations, selectConversation, user]);

  return (
    <ChatContext.Provider
      value={{
        socket,
        isConnected,
        conversations,
        currentConversation,
        messages,
        typingUsers,
        sendMessage,
        selectConversation,
        startNewChat,
        setTyping,
        markAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
