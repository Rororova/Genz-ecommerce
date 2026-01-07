import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  display_name: String,
  avatar_url: String,
  bio: String,
  role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
  is_active: { type: Boolean, default: true },
  email_verified: { type: Boolean, default: false },
  last_login: Date
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const User = mongoose.model('User', userSchema);
