import mongoose from 'mongoose';

const commentLikeSchema = new mongoose.Schema({
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: { createdAt: 'created_at' } });

commentLikeSchema.index({ comment: 1, user: 1 }, { unique: true });

export const CommentLike = mongoose.model('CommentLike', commentLikeSchema);
