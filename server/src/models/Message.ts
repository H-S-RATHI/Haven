import mongoose, { Document, Schema, Types } from 'mongoose';

export type TMessageStatus = 'sent' | 'delivered' | 'read';

export interface IMessage extends Document {
  conversationId: Types.ObjectId;
  sender: Types.ObjectId;
  content: string;
  status: TMessageStatus;
  readBy: Types.ObjectId[];
  attachments?: {
    type: string;
    url: string;
    name?: string;
    size?: number;
  }[];
}

const messageSchema = new Schema<IMessage>(
  {
    conversationId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Conversation', 
      required: true 
    },
    sender: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['sent', 'delivered', 'read'], 
      default: 'sent' 
    },
    readBy: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    attachments: [{
      type: { type: String }, // 'image', 'video', 'document', etc.
      url: String,
      name: String,
      size: Number
    }]
  },
  { timestamps: true }
);

// Index for faster message retrieval by conversation
messageSchema.index({ conversationId: 1, createdAt: -1 });

export default mongoose.model<IMessage>('Message', messageSchema);
