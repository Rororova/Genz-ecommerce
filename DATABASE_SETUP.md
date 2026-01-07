# 🗄️ Database Setup Guide - Supabase

This project uses **Supabase** (PostgreSQL) as the database.

## 📋 Prerequisites

- A [Supabase](https://supabase.com) account
- Your Supabase project credentials

## 🔑 Getting Your Credentials

1. **Go to your Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Select your project (or create a new one)

2. **Get Your Project URL**
   - Go to **Settings** → **API**
   - Copy the **Project URL** (looks like: `https://xxxxx.supabase.co`)

3. **Get Your Service Role Key** ⚠️
   - In the same **Settings** → **API** page
   - Find the **service_role** key (NOT the anon/public key)
   - Click to reveal and copy it
   - **IMPORTANT:** This key bypasses Row Level Security - keep it secret!

## 🛠️ Setup Steps

### 1. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then edit `.env` and add your credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-service-role-key-here
```

### 2. Set Up Database Schema

Run the SQL schema in your Supabase dashboard:

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy the entire contents of `SUPABASE_SCHEMA.sql`
4. Paste it into the SQL editor
5. Click **Run** to execute

This will create all necessary tables:
- `users` - User accounts
- `user_sessions` - Authentication sessions
- `forum_posts` - Forum posts/articles
- `comments` - Post comments
- `hashtags` - Post tags
- `post_hashtags` - Post-tag relationships
- `post_likes` - Post likes
- `comment_likes` - Comment likes
- `newsletter_subscriptions` - Newsletter emails

### 3. Verify Setup

After running the schema, verify tables were created:

1. Go to **Table Editor** in Supabase
2. You should see all 9 tables listed
3. Check that Row Level Security is enabled (it should be by default)

## 🔒 Security Notes

### Why Service Role Key?

- **anon/public key**: For client-side use, respects Row Level Security
- **service role key**: For server-side use, bypasses RLS, full database access

Since this project runs an Express backend (`server/index.js`), we use the service role key to have full control over database operations.

### ⚠️ Important Security Rules

1. **NEVER** commit your `.env` file to git (it's in `.gitignore`)
2. **NEVER** expose the service role key client-side
3. **ALWAYS** use the service role key only in server-side code
4. When deploying, add environment variables to your hosting platform's secrets/env vars

## 🚀 Deployment

When deploying to **Vercel** or **Render**:

1. Add environment variables in the platform's dashboard:
   - `SUPABASE_URL` = Your project URL
   - `SUPABASE_KEY` = Your service role key

2. The app will automatically connect to Supabase on startup

## 🧪 Testing the Connection

To test if your Supabase connection works, run the server:

```bash
npm run server
```

You should see in the console:
```
Attempting to connect to Supabase...
Connected to Supabase
Using database provider: Supabase
```

If you see an error, double-check:
- ✅ Your `.env` file exists
- ✅ `SUPABASE_URL` is correct
- ✅ `SUPABASE_KEY` is the service role key (not anon key)
- ✅ Your Supabase project is active

## 📚 Schema Overview

The database uses PostgreSQL with the following structure:

```sql
users (authentication & profiles)
├── user_sessions (login sessions)
├── forum_posts (posts/articles)
│   ├── post_hashtags → hashtags
│   ├── post_likes
│   └── comments
│       └── comment_likes
└── newsletter_subscriptions
```

## 🔄 Alternative: MongoDB

If you prefer MongoDB, you can:

1. Install dependencies: `npm install mongoose`
2. Create `server/db/mongo.js` with your MongoDB provider
3. Update `server/db/index.js` to import MongoDB provider
4. Set `MONGODB_URI` in `.env`

The app architecture supports multiple database providers!

---

**Need help?** Check the [Supabase Documentation](https://supabase.com/docs)
