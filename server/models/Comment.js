import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumPost', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parent_comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    content: { type: String, required: true },
    likes_count: { type: Number, default: 0 },
    is_edited: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const Comment = mongoose.model('Comment', commentSchema);
