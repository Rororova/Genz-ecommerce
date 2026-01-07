import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import dotenv from 'dotenv'

import { dbRequest as db } from './db/index.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    database: db.name || 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Initialize Database
db.connect()
  .then(() => {
    initDataCheck();
  })
  .catch(err => {
    console.error('---------------------------------------------------');
    console.error('CRITICAL: NO DATABASE CONNECTION ESTABLISHED');
    console.error('Server will run, but API requests requiring DB will fail.');
    console.error('Please check your .env file and ensure Supabase is configured.');
    console.error('Error details:', err.message);
    console.error('---------------------------------------------------');
  });

// Simple password hashing (in production, use bcrypt)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex')
}

async function initDataCheck() {
  try {
    const userCount = await db.getUserCount();
    if (userCount === 0) {
      await seedInitialData();
    } else {
      console.log('Database already initialized.');
    }
  } catch (error) {
    console.error('Error checking init data:', error);
  }
}

// Seed initial data
async function seedInitialData() {
  console.log('Seeding initial data...');

  // Create default moderator account
  const moderatorPassword = hashPassword('moderator123')
  const moderator = await db.createUser({
    username: 'moderator',
    email: 'moderator@coolchair.com',
    password_hash: moderatorPassword,
    display_name: 'COOL MODERATOR',
    role: 'moderator',
    email_verified: true
  });

  // Create initial hashtags
  const initialHashtags = [
    { tag: 'SIGMA', slug: 'sigma', trending: true },
    { tag: 'CHAIRS', slug: 'chairs', trending: true },
    { tag: 'SITTING', slug: 'sitting', trending: true },
    { tag: 'WATCHING', slug: 'watching', trending: true },
    { tag: 'OHIO', slug: 'ohio', trending: false },
    { tag: 'RIZZ', slug: 'rizz', trending: false },
    { tag: 'LIFESTYLE', slug: 'lifestyle', trending: false },
    { tag: 'FURNITURE', slug: 'furniture', trending: false }
  ];

  const createdHashtags = {};
  for (const hashtag of initialHashtags) {
    const created = await db.createHashtag(hashtag);
    createdHashtags[hashtag.tag] = created.id || created._id;
  }

  // Create initial forum posts
  const initialPosts = [
    {
      title: "HOW TO MOG YOUR LIVING ROOM FURNITURE",
      slug: "how-to-mog-your-living-room-furniture",
      excerpt: "Stop letting your sofa dominate the space. Assert dominance over your upholstery with these simple alpha feng shui techniques.",
      content: `<p>Welcome to the ultimate guide on furniture dominance. In this comprehensive article, we'll explore how to make your living room furniture work for you, not against you.</p><p>First, let's talk about spatial awareness. Your furniture should know its place - literally. Position your chairs strategically to command respect from any angle.</p><p>Remember: furniture is about power dynamics. Don't let your sofa think it runs the show.</p>`,
      featured_image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
      category: "LIFESTYLE",
      category_bg_color: "bg-lime-400",
      featured: true,
      read_time: 5,
      hashtags: [createdHashtags['SIGMA'], createdHashtags['FURNITURE']]
    },
    {
      title: "Top 10 Corners to Cry In",
      slug: "top-10-corners-to-cry-in",
      excerpt: "We rated every corner of a standard apartment based on acoustics, lighting, and general vibe. You won't believe number 4.",
      content: `<p>After extensive research (and many breakdowns), we've compiled the definitive ranking of apartment corners for emotional release.</p><p>Number 10: The kitchen corner by the sink. Pros: Access to water. Cons: Too public.</p><p>Number 4: The hallway corner. This one surprised us with its perfect echo-to-privacy ratio.</p>`,
      featured_image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2064&auto=format&fit=crop",
      category: "LIFESTYLE",
      category_bg_color: "bg-yellow-400",
      featured: false,
      read_time: 3
    },
    {
      title: "Is Your Chair \"Mid\"?",
      slug: "is-your-chair-mid",
      excerpt: "If it doesn't have lumbar support and at least 3 legs, it might be cringe. A comprehensive review of seating paradigms.",
      content: `<p>Let's face it: not all chairs are created equal. Some are sigma, some are alpha, and some are just... mid.</p><p>We've developed a comprehensive rating system based on leg count, comfort factor, and rizz potential. Your current chair might not make the cut.</p>`,
      featured_image: "https://images.unsplash.com/photo-1506898667547-42e22a46e125?q=80&w=2006&auto=format&fit=crop",
      category: "FURNITURE",
      category_bg_color: "bg-pink-500 text-white",
      featured: false,
      read_time: 4
    }
  ]

  for (const post of initialPosts) {
    const { hashtags, ...pData } = post;
    await db.createPost({
      ...pData,
      author: moderator.id || moderator._id,
      hashtags: hashtags || []
    });
  }

  console.log('Initial data seeded successfully')
  console.log('Default moderator account: username=moderator, password=moderator123')
}

// Middleware to check authentication
async function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' })
  }

  try {
    const session = await db.findSession(token);

    if (!session) {
      return res.status(401).json({ success: false, message: 'Invalid or expired session' })
    }

    const user = await db.findUserById(session.user || session.user_id); // Handle mongo vs supabase key
    if (!user || user.is_active === false) { // Handle undefined active check
      return res.status(401).json({ success: false, message: 'User not found or inactive' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    res.status(500).json({ success: false, message: 'Authentication failed' })
  }
}

// Middleware to check if user is moderator or admin
function requireModerator(req, res, next) {
  if (req.user.role !== 'moderator' && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Moderator access required' })
  }
  next()
}

// ============================================
// USER AUTHENTICATION ENDPOINTS
// ============================================

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Username, email, and password are required' })
    }

    const existing = await db.findUserByUsernameOrEmail(username.toLowerCase(), email.toLowerCase());

    if (existing) {
      return res.status(409).json({ success: false, message: 'Username or email already exists' })
    }

    const passwordHash = hashPassword(password)
    const user = await db.createUser({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password_hash: passwordHash,
      display_name: displayName || username
    })

    res.json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: user.id || user._id,
        username: user.username,
        email: user.email,
        display_name: user.display_name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ success: false, message: 'Failed to create account' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' })
    }

    const user = await db.findUserByUsername(username.toLowerCase());

    if (!user || user.is_active === false) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const passwordHash = hashPassword(password)
    if (passwordHash !== user.password_hash) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    // Create session
    const sessionToken = generateSessionToken()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    const ipAddress = req.ip || req.connection.remoteAddress
    const userAgent = req.get('user-agent')

    await db.createSession({
      user_id: user.id || user._id,
      session_token: sessionToken,
      expires_at: expiresAt,
      ip_address: ipAddress,
      user_agent: userAgent
    })

    await db.updateUserLogin(user.id || user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id || user._id,
          username: user.username,
          email: user.email,
          display_name: user.display_name,
          avatar_url: user.avatar_url,
          role: user.role
        },
        token: sessionToken,
        expiresAt: expiresAt.toISOString()
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: 'Login failed' })
  }
})

app.post('/api/auth/logout', authenticateUser, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    await db.deleteSession(token)
    res.json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({ success: false, message: 'Logout failed' })
  }
})

app.get('/api/auth/me', authenticateUser, async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user.id || req.user._id,
      username: req.user.username,
      email: req.user.email,
      display_name: req.user.display_name,
      avatar_url: req.user.avatar_url,
      bio: req.user.bio,
      role: req.user.role
    }
  })
})

// ============================================
// FORUM POSTS ENDPOINTS
// ============================================

app.get('/api/forum/posts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 6
    const offset = (page - 1) * limit
    const category = req.query.category
    const featured = req.query.featured === 'true' ? true : (req.query.featured === 'false' ? false : undefined);

    const posts = await db.getPosts({ category, featured, limit, offset });
    const total = await db.getPostCount({ category, featured });
    const totalPages = Math.ceil(total / limit)

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch posts' })
  }
})

app.get('/api/forum/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const post = await db.getPostBySlug(slug);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' })
    }

    await db.incrementPostViews(post.id || post._id);

    res.json({ success: true, data: post })
  } catch (error) {
    console.error('Error fetching post:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch post' })
  }
})

app.post('/api/forum/posts', authenticateUser, requireModerator, async (req, res) => {
  try {
    const { title, excerpt, content, featuredImage, category, categoryBgColor, featured, hashtags } = req.body

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' })
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    // Process hashtags (ensure they exist)
    const postHashtagIds = []
    if (hashtags && hashtags.length > 0) {
      for (const tag of hashtags) {
        const tagSlug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        let hashtagObj = await db.findHashtagBySlug(tagSlug);

        if (!hashtagObj) {
          hashtagObj = await db.createHashtag({
            tag: tag.toUpperCase(),
            slug: tagSlug,
            usage_count: 0
          });
        }
        await db.incrementHashtagUsage(hashtagObj.id || hashtagObj._id);
        postHashtagIds.push(hashtagObj.id || hashtagObj._id);
      }
    }

    const post = await db.createPost({
      title,
      slug,
      excerpt,
      content,
      featured_image: featuredImage,
      author: req.user.id || req.user._id,
      category,
      category_bg_color: categoryBgColor || 'bg-yellow-400',
      featured: !!featured,
      read_time: Math.ceil(content.split(' ').length / 200),
      hashtags: postHashtagIds
    });

    res.json({ success: true, message: 'Post created successfully', data: { id: post.id || post._id, slug } })
  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).json({ success: false, message: 'Failed to create post' })
  }
})

// ============================================
// COMMENTS ENDPOINTS
// ============================================

app.get('/api/forum/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params
    const comments = await db.getComments(postId);
    res.json({ success: true, data: comments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch comments' })
  }
})

app.post('/api/forum/posts/:postId/comments', authenticateUser, async (req, res) => {
  try {
    const { postId } = req.params
    const { content, parentCommentId } = req.body

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Comment content is required' })
    }

    const comment = await db.createComment({
      post: postId,
      author: req.user.id || req.user._id,
      parent_comment: parentCommentId || undefined,
      content
    });

    await db.incrementPostComments(postId, 1);

    res.json({ success: true, message: 'Comment posted successfully', data: comment })
  } catch (error) {
    console.error('Error creating comment:', error)
    res.status(500).json({ success: false, message: 'Failed to post comment' })
  }
})

// ============================================
// LIKES ENDPOINTS
// ============================================

app.post('/api/forum/posts/:postId/like', authenticateUser, async (req, res) => {
  try {
    const { postId } = req.params
    const userId = req.user.id || req.user._id;

    const existing = await db.findPostLike(postId, userId);

    if (existing) {
      await db.deletePostLike(existing.id || existing._id);
      await db.incrementPostLikes(postId, -1);
      res.json({ success: true, message: 'Post unliked', liked: false })
    } else {
      await db.createPostLike(postId, userId);
      await db.incrementPostLikes(postId, 1);
      res.json({ success: true, message: 'Post liked', liked: true })
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    res.status(500).json({ success: false, message: 'Failed to toggle like' })
  }
})

app.post('/api/forum/comments/:commentId/like', authenticateUser, async (req, res) => {
  try {
    const { commentId } = req.params
    const userId = req.user.id || req.user._id;

    const existing = await db.findCommentLike(commentId, userId);

    if (existing) {
      await db.deleteCommentLike(existing.id || existing._id);
      await db.incrementCommentLikes(commentId, -1);
      res.json({ success: true, message: 'Comment unliked', liked: false })
    } else {
      await db.createCommentLike(commentId, userId);
      await db.incrementCommentLikes(commentId, 1);
      res.json({ success: true, message: 'Comment liked', liked: true })
    }
  } catch (error) {
    console.error('Error toggling comment like:', error)
    res.status(500).json({ success: false, message: 'Failed to toggle like' })
  }
})

// ============================================
// HASHTAGS & CATEGORIES ENDPOINTS
// ============================================

app.get('/api/hashtags/trending', async (req, res) => {
  try {
    const hashtags = await db.getTrendingHashtags();
    res.json({ success: true, data: hashtags })
  } catch (error) {
    console.error('Error fetching hashtags:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch hashtags' })
  }
})

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.getCategories();
    res.json({ success: true, data: categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch categories' })
  }
})

// ============================================
// NEWSLETTER ENDPOINTS
// ============================================

app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body
    const ipAddress = req.ip || req.connection.remoteAddress
    const userAgent = req.get('user-agent')

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      })
    }

    const existing = await db.findSubscription(email.toLowerCase());

    if (existing) {
      if (existing.status === 'unsubscribed') {
        await db.reactivateSubscription(email.toLowerCase(), ipAddress, userAgent);

        return res.json({
          success: true,
          message: 'Welcome back to the COOL CLUB! Your subscription has been reactivated.'
        })
      }
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed to the COOL CLUB!'
      })
    }

    await db.createSubscription({
      email: email.toLowerCase(),
      ip_address: ipAddress,
      user_agent: userAgent
    });

    res.json({
      success: true,
      message: 'Welcome to the COOL CLUB! You have successfully subscribed.'
    })
  } catch (error) {
    console.error('Newsletter error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to subscribe'
    })
  }
})

app.get('/api/newsletter/subscribe', (req, res) => {
  res.status(405).json({
    success: false,
    message: 'Method Not Allowed. Please use POST to subscribe.'
  })
})

app.post('/api/newsletter/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email required' })
    }

    await db.unsubscribeSubscription(email.toLowerCase())

    res.json({
      success: true,
      message: 'You have been unsubscribed from the COOL CLUB. Sad to see you go!'
    })
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    res.status(500).json({ success: false, message: 'Failed to unsubscribe' })
  }
})

// ============================================
// ARTICLES ENDPOINTS (Alias for Forum Posts)
// ============================================

app.get('/api/articles', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 6
    const offset = (page - 1) * limit
    const category = req.query.category
    const featured = req.query.featured === 'true' ? true : (req.query.featured === 'false' ? false : undefined);

    const posts = await db.getPosts({ category, featured, limit, offset });
    const total = await db.getPostCount({ category, featured });
    const totalPages = Math.ceil(total / limit)

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch articles' })
  }
})

app.get('/api/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const post = await db.getPostBySlug(slug);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found' })
    }

    await db.incrementPostViews(post.id || post._id);

    res.json({ success: true, data: post })
  } catch (error) {
    console.error('Error fetching article:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch article' })
  }
})

// Export app for Vercel
export default app;

// Only listen if running directly (not in Vercel)
if (process.env.NODE_ENV !== 'production' || process.env.VITE_VERCEL_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
