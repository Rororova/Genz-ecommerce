
import { createClient } from '@supabase/supabase-js';

// Helper to normalize Supabase response to match app expectations (camelCaseID)
const normalize = (data) => {
    if (!data) return null;
    // Supabase (Postgres) returns everything as is (snake_case usually)
    // Front end expects 'id' (which Postgres has) and camelCase author objects.
    // We need to shape joins manually if distinct from standard return.

    // Handle join results if they exist (e.g. author: { username: ... })
    // Supabase usually returns: { ..., users: { username: ... } } if joined.
    // We Map 'users' to 'author'

    const obj = { ...data };

    if (obj.users) {
        obj.author = obj.users;
        delete obj.users;
    }

    // Normalize user/author fields if they are at top level (depends on query)
    return obj;
};

export const supabaseProvider = {
    name: 'Supabase',
    client: null,

    async connect(url, key) {
        if (!url || !key) return false;
        try {
            this.client = createClient(url, key);
            // Quick check
            const { data, error } = await this.client.from('users').select('count', { count: 'exact', head: true });
            if (error && error.code !== 'PGRST116') { // Ignore checking error, just ensuring connection
                console.warn('Supabase connection check warning:', error.message);
            }
            console.log('Connected to Supabase');
            return true;
        } catch (e) {
            console.error('Supabase connection failed:', e);
            throw e;
        }
    },

    // --- Users ---
    async createUser(data) {
        const { data: user, error } = await this.client
            .from('users')
            .insert([{
                username: data.username,
                email: data.email,
                password_hash: data.password_hash,
                display_name: data.display_name,
                role: data.role || 'user',
                email_verified: data.email_verified || false
            }])
            .select()
            .single();
        if (error) throw error;
        return normalize(user);
    },
    async findUserByUsername(username) {
        const { data, error } = await this.client
            .from('users')
            .select('*')
            .eq('username', username)
            .single();
        if (error && error.code !== 'PGRST116') throw error; // 116 is no rows
        return normalize(data);
    },
    async findUserByEmail(email) {
        const { data, error } = await this.client
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return normalize(data);
    },
    async findUserById(id) {
        const { data, error } = await this.client
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return normalize(data);
    },
    async findUserByUsernameOrEmail(username, email) {
        const { data, error } = await this.client
            .from('users')
            .select('*')
            .or(`username.eq.${username},email.eq.${email}`)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return normalize(data);
    },
    async updateUserLogin(id) {
        await this.client.from('users').update({ last_login: new Date() }).eq('id', id);
    },
    async getUserCount() {
        const { count } = await this.client.from('users').select('*', { count: 'exact', head: true });
        return count;
    },

    // --- Sessions ---
    async createSession(data) {
        // data: { user_id, session_token, expires_at, ip_address, user_agent }
        // Postgres schema should match snake_case
        await this.client.from('user_sessions').insert([data]);
    },
    async findSession(token) {
        const { data, error } = await this.client
            .from('user_sessions')
            .select('*')
            .eq('session_token', token)
            .gt('expires_at', new Date().toISOString())
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return normalize(data);
    },
    async deleteSession(token) {
        await this.client.from('user_sessions').delete().eq('session_token', token);
    },

    // --- Posts ---
    async getPosts({ category, featured, limit, offset }) {
        let query = this.client
            .from('forum_posts')
            .select(`
                *,
                users:author_id (username, display_name, avatar_url),
                post_hashtags(hashtags(tag, slug))
            `)
            .eq('published', true)
            .order('pinned', { ascending: false })
            .order('published_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (category) query = query.eq('category', category);
        if (featured !== undefined) query = query.eq('featured', featured);

        const { data, error } = await query;
        if (error) throw error;

        // Transform hashtags structure (supabase returns nested array of objects)
        return data.map(post => {
            const p = normalize(post);
            // Fix hashtags flattened
            if (p.post_hashtags) {
                p.hashtags = p.post_hashtags.map(ph => ph.hashtags);
                delete p.post_hashtags;
            } else {
                p.hashtags = [];
            }
            return p;
        });
    },
    async getPostCount({ category, featured }) {
        let query = this.client.from('forum_posts').select('*', { count: 'exact', head: true }).eq('published', true);
        if (category) query = query.eq('category', category);
        if (featured !== undefined) query = query.eq('featured', featured);
        const { count } = await query;
        return count;
    },
    async getPostBySlug(slug) {
        const { data, error } = await this.client
            .from('forum_posts')
            .select(`
                *,
                users:author_id (username, display_name, avatar_url),
                post_hashtags(hashtags(tag, slug))
            `)
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        if (!data) return null;

        const p = normalize(data);
        if (p.post_hashtags) {
            p.hashtags = p.post_hashtags.map(ph => ph.hashtags);
            delete p.post_hashtags;
        }
        return p;
    },
    async createPost(data) {
        // data: { title, slug, content, author_id, ... hashtags: [id, id] }
        // Supabase Insert needs clean object.
        const { hashtags, author, ...postData } = data;
        postData.author_id = author; // Normalize

        // If new post is featured, remove featured status from all others
        if (postData.featured) {
            await this.client
                .from('forum_posts')
                .update({ featured: false })
                .eq('featured', true);
        }

        const { data: post, error } = await this.client
            .from('forum_posts')
            .insert([postData])
            .select()
            .single();
        if (error) throw error;

        // Link hashtags
        if (hashtags && hashtags.length) {
            const pivots = hashtags.map(hid => ({ post_id: post.id, hashtag_id: hid }));
            await this.client.from('post_hashtags').insert(pivots);
        }

        return normalize(post);
    },
    async incrementPostViews(id) {
        // Simple update for views
        const { data: post, error: fetchError } = await this.client
            .from('forum_posts')
            .select('views')
            .eq('id', id)
            .single();

        if (fetchError) return;

        await this.client
            .from('forum_posts')
            .update({ views: (post.views || 0) + 1 })
            .eq('id', id);
    },
    async incrementPostLikes(id, amount) {
        // Fetch current count first (not atomic but functional without RPC)
        const { data: post, error: fetchError } = await this.client
            .from('forum_posts')
            .select('likes_count')
            .eq('id', id)
            .single();

        if (fetchError) return;

        const newCount = Math.max(0, (post.likes_count || 0) + amount);

        await this.client
            .from('forum_posts')
            .update({ likes_count: newCount })
            .eq('id', id);
    },
    async incrementPostComments(id, amount) {
        const { data: post, error: fetchError } = await this.client
            .from('forum_posts')
            .select('comments_count')
            .eq('id', id)
            .single();

        if (fetchError) return;

        const newCount = Math.max(0, (post.comments_count || 0) + amount);

        await this.client
            .from('forum_posts')
            .update({ comments_count: newCount })
            .eq('id', id);
    },
    // --- Comments ---
    async getComments(postId) {
        const { data, error } = await this.client
            .from('comments')
            .select(`
                *,
                users:author_id (username, display_name, avatar_url)
            `)
            .eq('post_id', postId)
            .eq('is_deleted', false)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data.map(normalize);
    },
    async createComment(data) {
        // data: { post_id, author_id, ... } - ensure keys match postgres schema
        const flatData = { ...data, post_id: data.post, author_id: data.author, parent_comment_id: data.parent_comment };
        delete flatData.post;
        delete flatData.author;
        delete flatData.parent_comment;

        const { data: comment, error } = await this.client
            .from('comments')
            .insert([flatData])
            .select(`*, users:author_id (username, display_name, avatar_url)`)
            .single();

        if (error) throw error;
        return normalize(comment);
    },
    async incrementCommentLikes(id, amount) {
        const { data: comment, error: fetchError } = await this.client
            .from('comments')
            .select('likes_count')
            .eq('id', id)
            .single();

        if (fetchError) return;

        const newCount = Math.max(0, (comment.likes_count || 0) + amount);

        await this.client
            .from('comments')
            .update({ likes_count: newCount })
            .eq('id', id);
    },

    // --- Likes ---
    async findPostLike(postId, userId) {
        const { data, error } = await this.client
            .from('post_likes')
            .select('*')
            .eq('post_id', postId)
            .eq('user_id', userId)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },
    async createPostLike(postId, userId) {
        await this.client.from('post_likes').insert([{ post_id: postId, user_id: userId }]);
    },
    async deletePostLike(id) {
        // id here might be the like ID.
        await this.client.from('post_likes').delete().eq('id', id);
    },
    async findCommentLike(commentId, userId) {
        const { data, error } = await this.client
            .from('comment_likes')
            .select('*')
            .eq('comment_id', commentId)
            .eq('user_id', userId)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },
    async createCommentLike(commentId, userId) {
        await this.client.from('comment_likes').insert([{ comment_id: commentId, user_id: userId }]);
    },
    async deleteCommentLike(id) {
        await this.client.from('comment_likes').delete().eq('id', id);
    },

    // --- Hashtags ---
    async findHashtagBySlug(slug) {
        const { data, error } = await this.client
            .from('hashtags')
            .select('*')
            .eq('slug', slug)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },
    async createHashtag(data) {
        const { data: tag, error } = await this.client
            .from('hashtags')
            .insert([data])
            .select()
            .single();
        if (error) throw error;
        return tag;
    },
    async incrementHashtagUsage(id) {
        // RPC needed
    },
    async getTrendingHashtags() {
        const { data, error } = await this.client
            .from('hashtags')
            .select('*')
            .eq('trending', true)
            .order('usage_count', { ascending: false })
            .limit(10);

        if (!data || data.length === 0) {
            // Fallback for "preloaded" look if DB is empty
            return [
                { tag: 'SIGMA', usage_count: 100 },
                { tag: 'CHAIRS', usage_count: 80 },
                { tag: 'FURNITURE', usage_count: 50 },
                { tag: 'OHIO', usage_count: 40 },
                { tag: 'RIZZ', usage_count: 30 }
            ];
        }
        return data;
    },

    // --- Categories ---
    async getCategories() {
        // Fetch all categories to aggregate manually since counting RPC is missing
        const { data, error } = await this.client
            .from('forum_posts')
            .select('category')
            .eq('published', true);

        if (error) {
            console.error('Error fetching categories:', error);
            // Fallback
            return [
                { name: 'LIFESTYLE', count: 0 },
                { name: 'FURNITURE', count: 0 }
            ];
        }

        // Aggregate counts
        const counts = {};
        if (data) {
            data.forEach(post => {
                if (post.category) {
                    counts[post.category] = (counts[post.category] || 0) + 1;
                }
            });
        }

        return Object.keys(counts).map(key => ({
            name: key,
            count: counts[key]
        }));
    },

    // --- Newsletter ---
    async findSubscription(email) {
        const { data, error } = await this.client
            .from('newsletter_subscriptions')
            .select('*')
            .eq('email', email)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },
    async createSubscription(data) {
        await this.client.from('newsletter_subscriptions').insert([data]);
    },
    async reactivateSubscription(email, ip, ua) {
        await this.client
            .from('newsletter_subscriptions')
            .update({ status: 'active', subscribed_at: new Date(), ip_address: ip, user_agent: ua })
            .eq('email', email);
    },
    async unsubscribeSubscription(email) {
        await this.client
            .from('newsletter_subscriptions')
            .update({ status: 'unsubscribed' })
            .eq('email', email);
    }
};
