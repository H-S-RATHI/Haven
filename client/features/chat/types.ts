export interface User {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  conversationId: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message | null; // Can be null for new conversations
  unreadCount: number;
}

export interface SendMessagePayload {
  content: string;
  conversationId: string;
  sender: string;
}

export interface SocketEvents {
  'message:new': (message: Message) => void;
  'message:read': (data: { messageIds: string[]; readerId: string }) => void;
  'user:typing': (data: { conversationId: string; userId: string; isTyping: boolean }) => void;
  'user:status': (data: { userId: string; status: 'online' | 'offline'; lastSeen?: Date }) => void;
}
