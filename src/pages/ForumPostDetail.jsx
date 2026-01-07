import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Marquee from '../components/Marquee'

const ForumPostDetail = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [commentText, setCommentText] = useState('')
    const [user, setUser] = useState(null)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        fetchPost()
        fetchComments()
        checkAuth()
    }, [slug])

    const checkAuth = () => {
        const token = localStorage.getItem('auth_token')
        const userData = localStorage.getItem('user_data')
        if (token && userData) {
            setUser(JSON.parse(userData))
        }
    }

    const fetchPost = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/forum/posts/${slug}`)
            const data = await response.json()

            if (data.success) {
                setPost(data.data)
            } else {
                setError('Post not found')
            }
        } catch (err) {
            setError('Failed to load post')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const fetchComments = async () => {
        try {
            const postData = await fetch(`/api/forum/posts/${slug}`)
            const postJson = await postData.json()
            if (postJson.success) {
                const response = await fetch(`/api/forum/posts/${postJson.data.id}/comments`)
                const data = await response.json()
                if (data.success) {
                    setComments(data.data)
                }
            }
        } catch (err) {
            console.error('Failed to load comments:', err)
        }
    }

    const handleLike = async () => {
        if (!user) {
            alert('Please login to like posts')
            return
        }

        try {
            const token = localStorage.getItem('auth_token')
            const response = await fetch(`/api/forum/posts/${post.id}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (data.success) {
                setLiked(data.liked)
                setPost(prev => ({
                    ...prev,
                    likes_count: data.liked ? prev.likes_count + 1 : prev.likes_count - 1
                }))
            }
        } catch (err) {
            console.error('Failed to like post:', err)
        }
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            alert('Please login to comment')
            return
        }

        if (!commentText.trim()) return

        try {
            const token = localStorage.getItem('auth_token')
            const response = await fetch(`/api/forum/posts/${post.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: commentText })
            })
            const data = await response.json()
            if (data.success) {
                setComments([...comments, data.data])
                setCommentText('')
                setPost(prev => ({ ...prev, comments_count: prev.comments_count + 1 }))
            }
        } catch (err) {
            console.error('Failed to post comment:', err)
        }
    }

    const handleCommentLike = async (commentId) => {
        if (!user) {
            alert('Please login to like comments')
            return
        }

        try {
            const token = localStorage.getItem('auth_token')
            const response = await fetch(`/api/forum/comments/${commentId}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (data.success) {
                setComments(comments.map(c =>
                    c.id === commentId
                        ? { ...c, likes_count: data.liked ? c.likes_count + 1 : c.likes_count - 1 }
                        : c
                ))
            }
        } catch (err) {
            console.error('Failed to like comment:', err)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen">
                <Marquee text="READING IS FUNDAMENTAL • TOUCH GRASS LATER • SKIBIDI SCHOLAR • KNOWLEDGE IS POWER (AND RIZZ) • NO TL;DR HERE" />
                <Nav />
                <div className="text-center py-20">
                    <p className="text-xl font-bold">Loading brainrot...</p>
                </div>
                <Footer />
            </div>
        )
    }

    if (error || !post) {
        return (
            <div className="min-h-screen">
                <Marquee text="READING IS FUNDAMENTAL • TOUCH GRASS LATER • SKIBIDI SCHOLAR • KNOWLEDGE IS POWER (AND RIZZ) • NO TL;DR HERE" />
                <Nav />
                <div className="text-center py-20">
                    <h1 className="font-syne text-4xl font-bold mb-4">Post Not Found</h1>
                    <Link to="/forum" className="text-yellow-400 hover:underline">
                        Back to Forum
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Marquee text="READING IS FUNDAMENTAL • TOUCH GRASS LATER • SKIBIDI SCHOLAR • KNOWLEDGE IS POWER (AND RIZZ) • NO TL;DR HERE" />
            <Nav />

            {/* Breadcrumb */}
            <div className="bg-[#fafafa] border-b-2 border-black px-6 py-4">
                <div className="max-w-4xl mx-auto">
                    <nav className="flex gap-2 text-sm font-medium">
                        <Link to="/" className="hover:underline">Home</Link>
                        <span>/</span>
                        <Link to="/forum" className="hover:underline">Forum</Link>
                        <span>/</span>
                        <span className="text-gray-600 line-clamp-1">{post.title}</span>
                    </nav>
                </div>
            </div>

            {/* Post Header */}
            <header className="bg-[#fafafa] border-b-2 border-black py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">
                        <iconify-icon icon="lucide:user" width="14"></iconify-icon>
                        {post.display_name || post.username}
                        <span className="w-1 h-1 bg-black rounded-full"></span>
                        <iconify-icon icon="lucide:calendar" width="14"></iconify-icon>
                        {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        <span className="w-1 h-1 bg-black rounded-full"></span>
                        {post.read_time} Min Read
                        <span className="w-1 h-1 bg-black rounded-full"></span>
                        {post.views} views
                    </div>

                    <h1 className="font-syne text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 mb-6">
                        <span className={`${post.category_bg_color} border-2 border-black px-3 py-1 text-xs font-bold uppercase`}>
                            {post.category}
                        </span>
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2 border-2 border-black font-bold text-sm transition-colors ${liked ? 'bg-pink-500 text-white' : 'bg-white hover:bg-pink-500 hover:text-white'
                                }`}
                        >
                            <iconify-icon icon="lucide:heart" width="16"></iconify-icon>
                            {post.likes_count} Likes
                        </button>
                        <span className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-white font-bold text-sm">
                            <iconify-icon icon="lucide:message-circle" width="16"></iconify-icon>
                            {post.comments_count} Comments
                        </span>
                    </div>

                    {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.hashtags.map((tag, idx) => (
                                <Link
                                    key={idx}
                                    to={`/forum?hashtag=${tag.slug}`}
                                    className="border border-black bg-white px-2 py-1 text-xs font-bold hover:bg-black hover:text-white transition-colors"
                                >
                                    #{tag.tag}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* Featured Image */}
            {post.featured_image && (
                <div className="border-b-2 border-black">
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-[60vh] object-cover grayscale contrast-125"
                    />
                </div>
            )}

            {/* Post Content */}
            <article className="bg-white py-12 px-6 border-b-2 border-black">
                <div className="max-w-4xl mx-auto">
                    <div
                        className="prose prose-lg max-w-none font-medium leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        style={{
                            fontSize: '1.125rem',
                            lineHeight: '1.75rem'
                        }}
                    />
                </div>
            </article>

            {/* Comments Section */}
            <section className="bg-[#fafafa] py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-syne text-3xl font-bold mb-8 flex items-center gap-3">
                        <iconify-icon icon="lucide:message-circle" width="32"></iconify-icon>
                        Comments ({comments.length})
                    </h2>

                    {/* Comment Form */}
                    {user ? (
                        <form onSubmit={handleCommentSubmit} className="mb-12">
                            <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_black]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-yellow-400 border-2 border-black flex items-center justify-center font-bold">
                                        {user.display_name?.[0] || user.username?.[0] || 'U'}
                                    </div>
                                    <span className="font-bold">{user.display_name || user.username}</span>
                                </div>
                                <textarea
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Share your thoughts..."
                                    className="w-full border-2 border-black p-4 font-medium resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    rows="4"
                                />
                                <button
                                    type="submit"
                                    className="mt-4 px-6 py-3 bg-black text-white font-bold uppercase tracking-wider text-sm hover:bg-yellow-400 hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_#888]"
                                >
                                    Post Comment
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mb-12 bg-yellow-400 border-2 border-black p-6 shadow-[4px_4px_0px_0px_black]">
                            <p className="font-bold mb-4">Want to join the discussion?</p>
                            <Link
                                to="/login"
                                className="inline-block px-6 py-3 bg-black text-white font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_#888]"
                            >
                                Login or Create Account
                            </Link>
                        </div>
                    )}

                    {/* Comments List */}
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_black]">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-lime-400 border-2 border-black flex items-center justify-center font-bold flex-shrink-0">
                                        {comment.display_name?.[0] || comment.username?.[0] || 'U'}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-bold">{comment.display_name || comment.username}</span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(comment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mb-4 leading-relaxed">{comment.content}</p>
                                        <button
                                            onClick={() => handleCommentLike(comment.id)}
                                            className="flex items-center gap-2 text-sm font-bold hover:text-pink-600 transition-colors"
                                        >
                                            <iconify-icon icon="lucide:heart" width="14"></iconify-icon>
                                            {comment.likes_count} Likes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {comments.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-black bg-white">
                            <iconify-icon icon="lucide:message-circle" width="48" className="mx-auto mb-4 text-gray-400"></iconify-icon>
                            <p className="text-gray-500 font-medium">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Navigation */}
            <div className="bg-yellow-400 border-y-2 border-black py-12 px-6">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <button
                        onClick={() => navigate('/forum')}
                        className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider text-sm hover:bg-lime-400 hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_#000]"
                    >
                        ← Back to Forum
                    </button>
                    <Link
                        to="/forum"
                        className="px-6 py-3 bg-white border-2 border-black font-bold uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_#000]"
                    >
                        More Brainrot →
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ForumPostDetail
