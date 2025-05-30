import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  phoneNumber: string;
  fullName: string;
  username: string;
  email?: string;
  location: string;
  bio?: string;
  accountType: 'normal' | 'creator';
  verified: boolean;
  lastSeen: Date;
  status: 'online' | 'offline' | 'away';
}

const userSchema = new Schema<IUser>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String },
    location: { type: String, required: true },
    bio: { type: String },
    accountType: { type: String, enum: ['normal', 'creator'], default: 'normal' },
    verified: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    status: { type: String, enum: ['online', 'offline', 'away'], default: 'offline' },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
