
import dotenv from 'dotenv';
import { mongoProvider } from './mongo.js';
import { supabaseProvider } from './supabase.js';

dotenv.config();

class DatabaseManager {
    constructor() {
        this.provider = null;
    }

    async connect() {
        // Priority 1: MongoDB
        if (process.env.MONGODB_URI) {
            try {
                console.log('Attempting to connect to MongoDB...');
                await mongoProvider.connect(process.env.MONGODB_URI);
                this.provider = mongoProvider;
                console.log('Using database provider: MongoDB');
                return;
            } catch (err) {
                console.error('MongoDB connection failed:', err.message);
                console.log('Falling back to next provider...');
            }
        }

        // Priority 2: Supabase
        if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
            try {
                console.log('Attempting to connect to Supabase...');
                await supabaseProvider.connect(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
                this.provider = supabaseProvider;
                console.log('Using database provider: Supabase');
                return;
            } catch (err) {
                console.error('Supabase connection failed:', err.message);
            }
        }

        throw new Error('No available database connection could be established. Please check your .env configuration.');
    }

    // Proxy methods to current provider
    get name() { return this.provider?.name; }

    async createUser(data) { return this.provider.createUser(data); }
    async findUserByUsername(username) { return this.provider.findUserByUsername(username); }
    async findUserByEmail(email) { return this.provider.findUserByEmail(email); }
    async findUserById(id) { return this.provider.findUserById(id); }
    async findUserByUsernameOrEmail(u, e) { return this.provider.findUserByUsernameOrEmail(u, e); }
    async updateUserLogin(id) { return this.provider.updateUserLogin(id); }
    async getUserCount() { return this.provider.getUserCount(); }

    async createSession(data) { return this.provider.createSession(data); }
    async findSession(token) { return this.provider.findSession(token); }
    async deleteSession(token) { return this.provider.deleteSession(token); }

    async getPosts(params) { return this.provider.getPosts(params); }
    async getPostCount(params) { return this.provider.getPostCount(params); }
    async getPostBySlug(slug) { return this.provider.getPostBySlug(slug); }
    async createPost(data) { return this.provider.createPost(data); }
    async incrementPostViews(id) { return this.provider.incrementPostViews(id); }
    async incrementPostLikes(id, n) { return this.provider.incrementPostLikes(id, n); }
    async incrementPostComments(id, n) { return this.provider.incrementPostComments(id, n); }

    async getComments(postId) { return this.provider.getComments(postId); }
    async createComment(data) { return this.provider.createComment(data); }
    async incrementCommentLikes(id, n) { return this.provider.incrementCommentLikes(id, n); }

    async findPostLike(pid, uid) { return this.provider.findPostLike(pid, uid); }
    async createPostLike(pid, uid) { return this.provider.createPostLike(pid, uid); }
    async deletePostLike(id) { return this.provider.deletePostLike(id); }

    async findCommentLike(cid, uid) { return this.provider.findCommentLike(cid, uid); }
    async createCommentLike(cid, uid) { return this.provider.createCommentLike(cid, uid); }
    async deleteCommentLike(id) { return this.provider.deleteCommentLike(id); }

    async findHashtagBySlug(slug) { return this.provider.findHashtagBySlug(slug); }
    async createHashtag(data) { return this.provider.createHashtag(data); }
    async incrementHashtagUsage(id) { return this.provider.incrementHashtagUsage(id); }
    async getTrendingHashtags() { return this.provider.getTrendingHashtags(); }

    async getCategories() { return this.provider.getCategories(); }

    async findSubscription(email) { return this.provider.findSubscription(email); }
    async createSubscription(data) { return this.provider.createSubscription(data); }
    async reactivateSubscription(e, i, u) { return this.provider.reactivateSubscription(e, i, u); }
}

export const dbRequest = new DatabaseManager();
