
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
        // RPC call usually best for atomic increments, but standard SQL update via rpc is:
        const { error } = await this.client.rpc('increment_views', { row_id: id });
        // If RPC doesn't exist, we skip or do read-write (risky).
        // For this demo we'll assume an RPC exists (I should provide SQL for it) OR just mock it.
        // Fallback: Read-update
    },
    async incrementPostLikes(id, amount) {
        // Warning: Race conditions in simplified read-write.
        // Assuming 'increment_likes' rpc exists
        // await this.client.rpc('increment_post_likes', { post_id: id, amount });
    },
    async incrementPostComments(id, amount) {
        // await this.client.rpc('increment_post_comments', { post_id: id, amount });
    },

    // Fallback atomic increment simulation (not perfectly atomic without stored proc)
    // We will just leave these blank or log warning if no RPC.

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
        // Implement via RPC or ignore for MVP
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
        return data || [];
    },

    // --- Categories ---
    async getCategories() {
        // Group by in Supabase client is limited. Custom SQL via RPC or just fetch all and group js (bad for perf but ok for small apps).
        // Or create a view.
        // For MVP, returning empty or fetching raw
        // Let's assume we have an RPC or view 'get_category_counts'
        const { data, error } = await this.client.rpc('get_category_counts');
        if (error) {
            console.warn('Supabase categories RPC missing, returning empty.');
            return [];
        }
        return data;
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
    }
};
