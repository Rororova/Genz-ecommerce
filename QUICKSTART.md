# 🚀 Quick Start - Supabase Setup

## 1️⃣ Get Your Credentials

Visit: https://app.supabase.com → Select your project → Settings → API

Copy these:
- **Project URL**: `https://xxxxx.supabase.co`
- **service_role key**: `eyJhbGci...` (NOT the anon key!)

## 2️⃣ Update .env File

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-service-role-key-here
```

## 3️⃣ Run Database Schema

1. Go to Supabase → SQL Editor
2. Copy all from `SUPABASE_SCHEMA.sql`
3. Paste and run

## 4️⃣ Start Your Server

```bash
npm install
npm run server
```

## ✅ Success Message

You should see:
```
Connected to Supabase
Using database provider: Supabase
Server running on port 3000
```

---

## 🔑 Key Points

- ✅ Use **service_role** key (not anon)
- ✅ Keep service key **secret** (server-side only)
- ✅ Run `SUPABASE_SCHEMA.sql` in Supabase dashboard
- ✅ Never commit `.env` to git

## 📖 Full Guide

See `DATABASE_SETUP.md` for detailed instructions.
