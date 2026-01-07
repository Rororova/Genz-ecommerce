import mongoose from 'mongoose';

const userSessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    session_token: { type: String, required: true, unique: true },
    expires_at: { type: Date, required: true },
    ip_address: String,
    user_agent: String
}, { timestamps: { createdAt: 'created_at' } });

export const UserSession = mongoose.model('UserSession', userSessionSchema);
