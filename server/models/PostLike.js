import mongoose from 'mongoose';

const postLikeSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumPost', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: { createdAt: 'created_at' } });

// Compound unique index
postLikeSchema.index({ post: 1, user: 1 }, { unique: true });

export const PostLike = mongoose.model('PostLike', postLikeSchema);
