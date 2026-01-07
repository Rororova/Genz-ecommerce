import mongoose from 'mongoose';

const hashtagSchema = new mongoose.Schema({
    tag: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    usage_count: { type: Number, default: 0 },
    trending: { type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_at' } });

export const Hashtag = mongoose.model('Hashtag', hashtagSchema);
