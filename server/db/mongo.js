
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { ForumPost } from '../models/ForumPost.js';
import { Comment } from '../models/Comment.js';
import { PostLike } from '../models/PostLike.js';
import { CommentLike } from '../models/CommentLike.js';
import { Hashtag } from '../models/Hashtag.js';
import { UserSession } from '../models/UserSession.js';
import { NewsletterSubscription } from '../models/NewsletterSubscription.js';

// Helper to normalize ID
const normalize = (doc) => {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    obj.id = obj._id;
    // delete obj._id; // Keep _id for internal mongoose refs if needed, but frontend uses id
    if (obj.author && obj.author._id) {
        obj.author.id = obj.author._id;
    }
    return obj;
};

export const mongoProvider = {
    name: 'MongoDB',
    async connect(uri) {
        if (mongoose.connection.readyState === 1) return;
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    },

    // --- Users ---
    async createUser(data) {
        const user = await User.create(data);
        return normalize(user);
    },
    async findUserByUsername(username) {
        const user = await User.findOne({ username });
        return normalize(user);
    },
    async findUserByEmail(email) {
        const user = await User.findOne({ email });
        return normalize(user);
    },
    async findUserById(id) {
        const user = await User.findById(id);
        return normalize(user);
    },
    async findUserByUsernameOrEmail(username, email) {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        return normalize(user);
    },
    async updateUserLogin(id) {
        await User.findByIdAndUpdate(id, { last_login: new Date() });
    },
    async getUserCount() {
        return await User.countDocuments();
    },

    // --- Sessions ---
    async createSession(data) {
        // data: { user_id, session_token, expires_at, ip_address, user_agent }
        // Mongo model expects 'user' as ObjectId
        await UserSession.create({ ...data, user: data.user_id });
    },
    async findSession(token) {
        const session = await UserSession.findOne({
            session_token: token,
            expires_at: { $gt: new Date() }
        });
        return normalize(session);
    },
    async deleteSession(token) {
        await UserSession.deleteOne({ session_token: token });
    },

    // --- Posts ---
    async getPosts({ category, featured, limit, offset }) {
        let query = { published: true };
        if (category) query.category = category;
        if (featured !== undefined) query.featured = featured;

        const posts = await ForumPost.find(query)
            .populate('author', 'username display_name avatar_url')
            .populate('hashtags', 'tag slug')
            .sort({ pinned: -1, published_at: -1 })
            .skip(offset)
            .limit(limit);

        return posts.map(normalize);
    },
    async getPostCount({ category, featured }) {
        let query = { published: true };
        if (category) query.category = category;
        if (featured !== undefined) query.featured = featured;
        return await ForumPost.countDocuments(query);
    },
    async getPostBySlug(slug) {
        const post = await ForumPost.findOne({ slug, published: true })
            .populate('author', 'username display_name avatar_url')
            .populate('hashtags', 'tag slug');
        return normalize(post);
    },
    async createPost(data) {
        // data includes hashtags array of IDs
        const post = await ForumPost.create(data);
        return normalize(post);
    },
    async incrementPostViews(id) {
        await ForumPost.updateOne({ _id: id }, { $inc: { views: 1 } });
    },
    async updatePostStats(id, { likes, comments } = {}) {
        const update = {};
        if (likes !== undefined) update.likes_count = likes; // This logic might need to be inc/dec in controller
        // Actually the controller handles inc/dec.
        // Let's support specific increment helpers
    },
    async incrementPostLikes(id, amount) {
        await ForumPost.updateOne({ _id: id }, { $inc: { likes_count: amount } });
    },
    async incrementPostComments(id, amount) {
        await ForumPost.updateOne({ _id: id }, { $inc: { comments_count: amount } });
    },

    // --- Comments ---
    async getComments(postId) {
        const comments = await Comment.find({ post: postId, is_deleted: false })
            .populate('author', 'username display_name avatar_url')
            .sort({ created_at: 1 });
        return comments.map(normalize);
    },
    async createComment(data) {
        const comment = await Comment.create(data);
        const populated = await Comment.findById(comment._id)
            .populate('author', 'username display_name avatar_url');
        return normalize(populated);
    },
    async incrementCommentLikes(id, amount) {
        await Comment.updateOne({ _id: id }, { $inc: { likes_count: amount } });
    },

    // --- Likes ---
    async findPostLike(postId, userId) {
        return await PostLike.findOne({ post: postId, user: userId });
    },
    async createPostLike(postId, userId) {
        await PostLike.create({ post: postId, user: userId });
    },
    async deletePostLike(id) {
        await PostLike.deleteOne({ _id: id });
    },
    async findCommentLike(commentId, userId) {
        return await CommentLike.findOne({ comment: commentId, user: userId });
    },
    async createCommentLike(commentId, userId) {
        await CommentLike.create({ comment: commentId, user: userId });
    },
    async deleteCommentLike(id) {
        await CommentLike.deleteOne({ _id: id });
    },

    // --- Hashtags ---
    async findHashtagBySlug(slug) {
        const tag = await Hashtag.findOne({ slug });
        return normalize(tag);
    },
    async createHashtag(data) {
        const tag = await Hashtag.create(data);
        return normalize(tag);
    },
    async incrementHashtagUsage(id) {
        await Hashtag.updateOne({ _id: id }, { $inc: { usage_count: 1 } });
    },
    async getTrendingHashtags() {
        return await Hashtag.find({ trending: true })
            .sort({ usage_count: -1 })
            .limit(10);
    },

    // --- Categories ---
    async getCategories() {
        return await ForumPost.aggregate([
            { $match: { published: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $project: { name: '$_id', count: 1, _id: 0 } }
        ]);
    },

    // --- Newsletter ---
    async findSubscription(email) {
        const sub = await NewsletterSubscription.findOne({ email });
        return normalize(sub);
    },
    async createSubscription(data) {
        await NewsletterSubscription.create(data);
    },
    async reactivateSubscription(email, ip, ua) {
        await NewsletterSubscription.updateOne(
            { email },
            { status: 'active', subscribed_at: new Date(), ip_address: ip, user_agent: ua }
        );
    }
};
