import mongoose, { Document, Schema, Types } from 'mongoose';

export type TParticipant = {
  userId: Types.ObjectId;
  joinedAt: Date;
  leftAt?: Date;
};

export interface IConversation extends Document {
  participants: TParticipant[];
  lastMessage?: Types.ObjectId;
  isGroup: boolean;
  groupName?: string;
  groupPhoto?: string;
  groupAdmin?: Types.ObjectId;
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [{
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      joinedAt: { type: Date, default: Date.now },
      leftAt: { type: Date }
    }],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    isGroup: { type: Boolean, default: false },
    groupName: { type: String },
    groupPhoto: { type: String },
    groupAdmin: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

// Index for faster participant lookups
conversationSchema.index({ 'participants.userId': 1 });

export default mongoose.model<IConversation>('Conversation', conversationSchema);
