
import dotenv from 'dotenv';
import { supabaseProvider } from './supabase.js';

dotenv.config();

class DatabaseManager {
    constructor() {
        this.provider = null;
    }

    async connect() {
        // Use Supabase as primary database
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_KEY;

        if (url && key) {
            try {
                console.log('Attempting to connect to Supabase...');
                console.log(`Supabase URL provided: ${url.substring(0, 15)}...`);
                await supabaseProvider.connect(url, key);
                this.provider = supabaseProvider;
                console.log('Using database provider: Supabase');
                return;
            } catch (err) {
                console.error('Supabase connection failed:', err.message);
                throw new Error(`Supabase connection failed: ${err.message}. Check your SUPABASE_URL and SUPABASE_KEY.`);
            }
        }

        const missing = [];
        if (!url) missing.push('SUPABASE_URL');
        if (!key) missing.push('SUPABASE_KEY');

        throw new Error(`Missing Supabase credentials: ${missing.join(', ')}. Please set these variables in your .env file or Vercel project settings.`);
    }

    // Proxy methods to current provider
    get name() { return this.provider?.name; }

    _ensureProvider() {
        if (!this.provider) {
            throw new Error('Database not connected. Please check server logs and .env configuration.');
        }
    }

    async createUser(data) { this._ensureProvider(); return this.provider.createUser(data); }
    async findUserByUsername(username) { this._ensureProvider(); return this.provider.findUserByUsername(username); }
    async findUserByEmail(email) { this._ensureProvider(); return this.provider.findUserByEmail(email); }
    async findUserById(id) { this._ensureProvider(); return this.provider.findUserById(id); }
    async findUserByUsernameOrEmail(u, e) { this._ensureProvider(); return this.provider.findUserByUsernameOrEmail(u, e); }
    async updateUserLogin(id) { this._ensureProvider(); return this.provider.updateUserLogin(id); }
    async getUserCount() { this._ensureProvider(); return this.provider.getUserCount(); }

    async createSession(data) { this._ensureProvider(); return this.provider.createSession(data); }
    async findSession(token) { this._ensureProvider(); return this.provider.findSession(token); }
    async deleteSession(token) { this._ensureProvider(); return this.provider.deleteSession(token); }

    async getPosts(params) { this._ensureProvider(); return this.provider.getPosts(params); }
    async getPostCount(params) { this._ensureProvider(); return this.provider.getPostCount(params); }
    async getPostBySlug(slug) { this._ensureProvider(); return this.provider.getPostBySlug(slug); }
    async createPost(data) { this._ensureProvider(); return this.provider.createPost(data); }
    async incrementPostViews(id) { this._ensureProvider(); return this.provider.incrementPostViews(id); }
    async incrementPostLikes(id, n) { this._ensureProvider(); return this.provider.incrementPostLikes(id, n); }
    async incrementPostComments(id, n) { this._ensureProvider(); return this.provider.incrementPostComments(id, n); }

    async getComments(postId) { this._ensureProvider(); return this.provider.getComments(postId); }
    async createComment(data) { this._ensureProvider(); return this.provider.createComment(data); }
    async incrementCommentLikes(id, n) { this._ensureProvider(); return this.provider.incrementCommentLikes(id, n); }

    async findPostLike(pid, uid) { this._ensureProvider(); return this.provider.findPostLike(pid, uid); }
    async createPostLike(pid, uid) { this._ensureProvider(); return this.provider.createPostLike(pid, uid); }
    async deletePostLike(id) { this._ensureProvider(); return this.provider.deletePostLike(id); }

    async findCommentLike(cid, uid) { this._ensureProvider(); return this.provider.findCommentLike(cid, uid); }
    async createCommentLike(cid, uid) { this._ensureProvider(); return this.provider.createCommentLike(cid, uid); }
    async deleteCommentLike(id) { this._ensureProvider(); return this.provider.deleteCommentLike(id); }

    async findHashtagBySlug(slug) { this._ensureProvider(); return this.provider.findHashtagBySlug(slug); }
    async createHashtag(data) { this._ensureProvider(); return this.provider.createHashtag(data); }
    async incrementHashtagUsage(id) { this._ensureProvider(); return this.provider.incrementHashtagUsage(id); }
    async getTrendingHashtags() { this._ensureProvider(); return this.provider.getTrendingHashtags(); }

    async getCategories() { this._ensureProvider(); return this.provider.getCategories(); }

    async findSubscription(email) { this._ensureProvider(); return this.provider.findSubscription(email); }
    async createSubscription(data) { this._ensureProvider(); return this.provider.createSubscription(data); }
    async reactivateSubscription(e, i, u) { this._ensureProvider(); return this.provider.reactivateSubscription(e, i, u); }
}

export const dbRequest = new DatabaseManager();
