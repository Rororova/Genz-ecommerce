-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. USERS
-- ==========================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin')),
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Strict: No public access to users table (contains auth info). 
-- The Server (Service Role) can bypass this. 
-- If you need public profiles, consider creating a view or specific policy.
-- For now, we DENY ALL to anon.

-- ==========================================
-- 2. USER SESSIONS
-- ==========================================
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
-- Strict: No public access.

-- ==========================================
-- 3. HASHTAGS
-- ==========================================
CREATE TABLE hashtags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tag TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  usage_count INTEGER DEFAULT 0,
  trending BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE hashtags ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read hashtags
CREATE POLICY "Public read hashtags" 
ON hashtags FOR SELECT 
TO anon 
USING (true);

-- ==========================================
-- 4. FORUM POSTS
-- ==========================================
CREATE TABLE forum_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category TEXT,
  category_bg_color TEXT DEFAULT 'bg-yellow-400',
  featured BOOLEAN DEFAULT FALSE,
  pinned BOOLEAN DEFAULT FALSE,
  locked BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  read_time INTEGER DEFAULT 5,
  views INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read published posts
CREATE POLICY "Public read posts" 
ON forum_posts FOR SELECT 
TO anon 
USING (published = true);

-- ==========================================
-- 5. POST HASHTAGS
-- ==========================================
CREATE TABLE post_hashtags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  hashtag_id UUID REFERENCES hashtags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, hashtag_id)
);

ALTER TABLE post_hashtags ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read
CREATE POLICY "Public read post_hashtags" 
ON post_hashtags FOR SELECT 
TO anon 
USING (true);

-- ==========================================
-- 6. COMMENTS
-- ==========================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  is_edited BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read non-deleted comments
CREATE POLICY "Public read comments" 
ON comments FOR SELECT 
TO anon 
USING (is_deleted = false);

-- ==========================================
-- 7. POST LIKES
-- ==========================================
CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read likes (needed for counts/displaying state?)
-- Actually usually frontend just needs count. 
-- But keeping it open for read is mostly harmless.
CREATE POLICY "Public read post_likes" 
ON post_likes FOR SELECT 
TO anon 
USING (true);

-- ==========================================
-- 8. COMMENT LIKES
-- ==========================================
CREATE TABLE comment_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read comment_likes" 
ON comment_likes FOR SELECT 
TO anon 
USING (true);

-- ==========================================
-- 9. NEWSLETTER
-- ==========================================
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
-- Strict: No public access.

-- ==========================================
-- INDICES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON forum_posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON forum_posts(published);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);

-- ==========================================
-- HELPER VIEWS (For Public Profile Access)
-- ==========================================
-- Since 'users' is restricted, we create a secure view for reading author details
CREATE OR REPLACE VIEW public_user_profiles AS
SELECT id, username, display_name, avatar_url, bio, role, created_at
FROM users;

-- Grant access to the view (But public still needs access to underneath table? 
-- In Supabase, Views run with the privileges of the Creator (Owner) normally, 
-- NOT the invoker, unless specified. Standard Postgres Views bypass RLS on the table if the view owner has access.)
-- So this view effectively exposes the data safely.

GRANT SELECT ON public_user_profiles TO anon;
GRANT SELECT ON public_user_profiles TO authenticated;
