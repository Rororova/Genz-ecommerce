
import dotenv from 'dotenv';
import { supabaseProvider } from './supabase.js';

dotenv.config();

class DatabaseManager {
    constructor() {
        this.provider = null;
        this.connectionPromise = null;
    }

    async connect() {
        if (this.connectionPromise) return this.connectionPromise;

        this.connectionPromise = (async () => {
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
        })();

        return this.connectionPromise;
    }

    // Proxy methods to current provider
    get name() { return this.provider?.name; }

    async _ensureProvider() {
        if (this.provider) return;

        // If connecting, wait for it
        if (this.connectionPromise) {
            try {
                await this.connectionPromise;
            } catch (e) {
                // Ignore error here, we'll check provider next
            }
        }

        if (!this.provider) {
            throw new Error('Database not connected. Please check server logs and .env configuration for SUPABASE_URL and SUPABASE_KEY.');
        }
    }

    async createUser(data) { await this._ensureProvider(); return this.provider.createUser(data); }
    async findUserByUsername(username) { await this._ensureProvider(); return this.provider.findUserByUsername(username); }
    async findUserByEmail(email) { await this._ensureProvider(); return this.provider.findUserByEmail(email); }
    async findUserById(id) { await this._ensureProvider(); return this.provider.findUserById(id); }
    async findUserByUsernameOrEmail(u, e) { await this._ensureProvider(); return this.provider.findUserByUsernameOrEmail(u, e); }
    async updateUserLogin(id) { await this._ensureProvider(); return this.provider.updateUserLogin(id); }
    async getUserCount() { await this._ensureProvider(); return this.provider.getUserCount(); }

    async createSession(data) { await this._ensureProvider(); return this.provider.createSession(data); }
    async findSession(token) { await this._ensureProvider(); return this.provider.findSession(token); }
    async deleteSession(token) { await this._ensureProvider(); return this.provider.deleteSession(token); }

    async getPosts(params) { await this._ensureProvider(); return this.provider.getPosts(params); }
    async getPostCount(params) { await this._ensureProvider(); return this.provider.getPostCount(params); }
    async getPostBySlug(slug) { await this._ensureProvider(); return this.provider.getPostBySlug(slug); }
    async createPost(data) { await this._ensureProvider(); return this.provider.createPost(data); }
    async incrementPostViews(id) { await this._ensureProvider(); return this.provider.incrementPostViews(id); }
    async incrementPostLikes(id, n) { await this._ensureProvider(); return this.provider.incrementPostLikes(id, n); }
    async incrementPostComments(id, n) { await this._ensureProvider(); return this.provider.incrementPostComments(id, n); }

    async getComments(postId) { await this._ensureProvider(); return this.provider.getComments(postId); }
    async createComment(data) { await this._ensureProvider(); return this.provider.createComment(data); }
    async incrementCommentLikes(id, n) { await this._ensureProvider(); return this.provider.incrementCommentLikes(id, n); }

    async findPostLike(pid, uid) { await this._ensureProvider(); return this.provider.findPostLike(pid, uid); }
    async createPostLike(pid, uid) { await this._ensureProvider(); return this.provider.createPostLike(pid, uid); }
    async deletePostLike(id) { await this._ensureProvider(); return this.provider.deletePostLike(id); }

    async findCommentLike(cid, uid) { await this._ensureProvider(); return this.provider.findCommentLike(cid, uid); }
    async createCommentLike(cid, uid) { await this._ensureProvider(); return this.provider.createCommentLike(cid, uid); }
    async deleteCommentLike(id) { await this._ensureProvider(); return this.provider.deleteCommentLike(id); }

    async findHashtagBySlug(slug) { await this._ensureProvider(); return this.provider.findHashtagBySlug(slug); }
    async createHashtag(data) { await this._ensureProvider(); return this.provider.createHashtag(data); }
    async incrementHashtagUsage(id) { await this._ensureProvider(); return this.provider.incrementHashtagUsage(id); }
    async getTrendingHashtags() { await this._ensureProvider(); return this.provider.getTrendingHashtags(); }

    async getCategories() { await this._ensureProvider(); return this.provider.getCategories(); }

    async findSubscription(email) { await this._ensureProvider(); return this.provider.findSubscription(email); }
    async createSubscription(data) { await this._ensureProvider(); return this.provider.createSubscription(data); }
    async reactivateSubscription(e, i, u) { await this._ensureProvider(); return this.provider.reactivateSubscription(e, i, u); }
}

export const dbRequest = new DatabaseManager();
