import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { IUser } from '../models/User';
import { IMessage } from '../models/Message';
import { IConversation } from '../models/Conversation';
import MessageModel from '../models/Message';
import ConversationModel from '../models/Conversation';

// Extend Express Request to include user
declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}

// Socket with user data
export interface AuthenticatedSocket extends Socket {
  user?: IUser;
  userId?: string;
}

// Active connections
const activeConnections = new Map<string, string>(); // userId -> socketId

// Initialize Socket.IO
export const initSocket = (server: HttpServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Authentication middleware
  io.use((socket: any, next) => {
    const token = socket.handshake?.auth?.token;
    
    // In a real app, verify the JWT token here
    // For now, we'll just use the userId from the handshake
    const userId = socket.handshake?.auth?.userId;
    
    if (!userId) {
      return next(new Error('Authentication error'));
    }
    
    (socket as AuthenticatedSocket).userId = userId;
    next();
  });

  // Connection handler
  io.on('connection', (socket: any) => {
    const typedSocket = socket as AuthenticatedSocket;
    console.log('New client connected:', socket.id);

    // Add to active connections
    if (socket.userId) {
      activeConnections.set(socket.userId, socket.id);
      
      // Update user status to online
      socket.broadcast.emit('user:status', {
        userId: socket.userId,
        status: 'online'
      });
    }

    // Join conversation room
    socket.on('join:conversation', (conversationId: string) => {
      socket.join(`conversation:${conversationId}`);
      console.log(`User ${socket.userId} joined conversation ${conversationId}`);
    });

    // Leave conversation room
    socket.on('leave:conversation', (conversationId: string) => {
      socket.leave(`conversation:${conversationId}`);
      console.log(`User ${socket.userId} left conversation ${conversationId}`);
    });

    // Handle new message
    socket.on('message:send', async (data: {
      conversationId: string;
      content: string;
      attachments?: Array<{ type: string; url: string; name?: string; size?: number }>;
    }) => {
      try {
        // Save the message to the database
        const message = new MessageModel({
          conversationId: data.conversationId,
          sender: socket.userId,
          content: data.content,
          attachments: data.attachments,
          status: 'sent',
          readBy: [socket.userId]
        } as any);

        await message.save();

        // Emit the message to all participants in the conversation
        io.to(`conversation:${data.conversationId}`).emit('message:new', message);
        
        // Update last message in conversation
        await ConversationModel.findByIdAndUpdate(data.conversationId, {
          lastMessage: message._id
        } as any);

      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('message:error', { error: 'Failed to send message' });
      }
    });

    // Handle typing indicator
    socket.on('typing:start', (conversationId: string) => {
      socket.to(`conversation:${conversationId}`).emit('typing:start', {
        userId: socket.userId,
        conversationId
      });
    });

    socket.on('typing:stop', (conversationId: string) => {
      socket.to(`conversation:${conversationId}`).emit('typing:stop', {
        userId: socket.userId,
        conversationId
      });
    });

    // Handle message read receipts
    socket.on('message:read', async (messageIds: string[]) => {
      try {
        await MessageModel.updateMany(
          { _id: { $in: messageIds }, sender: { $ne: socket.userId } },
          { $addToSet: { readBy: socket.userId }, status: 'read' } as any
        );

        // Notify sender that messages were read
        io.emit('messages:read', {
          messageIds,
          readBy: socket.userId,
          readAt: new Date()
        });
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      
      if (socket.userId) {
        activeConnections.delete(socket.userId);
        
        // Update user status to offline
        socket.broadcast.emit('user:status', {
          userId: socket.userId,
          status: 'offline',
          lastSeen: new Date()
        });
      }
    });
  });

  return io;
};

// Utility function to get socket ID by user ID
export const getSocketId = (userId: string): string | undefined => {
  return activeConnections.get(userId);
};

// Utility function to get all socket IDs for multiple user IDs
export const getSocketIds = (userIds: string[]): string[] => {
  return userIds
    .map(userId => activeConnections.get(userId))
    .filter((socketId): socketId is string => socketId !== undefined);
};
