import mongoose from 'mongoose';

const forumPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: String,
    content: { type: String, required: true },
    featured_image: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: String,
    category_bg_color: { type: String, default: 'bg-yellow-400' },
    featured: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    locked: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    published_at: { type: Date, default: Date.now },
    read_time: { type: Number, default: 5 },
    views: { type: Number, default: 0 },
    likes_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hashtag' }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const ForumPost = mongoose.model('ForumPost', forumPostSchema);
