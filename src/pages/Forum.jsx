import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Marquee from '../components/Marquee'
import Newsletter from '../components/Newsletter'

const Forum = () => {
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [trendingTags, setTrendingTags] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [featuredPost, setFeaturedPost] = useState(null)

    useEffect(() => {
        fetchPosts(1)
        fetchCategories()
        fetchTrendingTags()
    }, [selectedCategory])

    const fetchPosts = async (pageNum = 1, append = false) => {
        try {
            if (pageNum === 1) {
                setLoading(true)
            } else {
                setLoadingMore(true)
            }

            const params = new URLSearchParams({
                page: pageNum.toString(),
                limit: '6'
            })

            if (selectedCategory) {
                params.append('category', selectedCategory)
            }

            // Fetch featured post separately on first page
            if (pageNum === 1) {
                const featuredResponse = await fetch('/api/forum/posts?featured=true&limit=1')
                const featuredData = await featuredResponse.json()
                if (featuredData.success && featuredData.data.length > 0) {
                    setFeaturedPost(featuredData.data[0])
                }
            }

            // Fetch regular posts (exclude featured on first page)
            if (pageNum === 1) {
                params.append('featured', 'false')
            }

            const response = await fetch(`/api/forum/posts?${params}`)
            const data = await response.json()

            if (data.success) {
                if (append) {
                    setPosts(prev => [...prev, ...data.data])
                } else {
                    setPosts(data.data)
                }
                setHasMore(data.pagination.hasMore)
                setPage(pageNum)
            }
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories')
            const data = await response.json()
            if (data.success) {
                setCategories(data.data)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const fetchTrendingTags = async () => {
        try {
            const response = await fetch('/api/hashtags/trending')
            const data = await response.json()
            if (data.success) {
                setTrendingTags(data.data.map(t => t.tag))
            }
        } catch (error) {
            console.error('Error fetching hashtags:', error)
        }
    }

    const handleLoadMore = () => {
        fetchPosts(page + 1, true)
    }

    const handleCategoryClick = (categoryName) => {
        if (selectedCategory === categoryName) {
            setSelectedCategory(null)
            fetchPosts(1)
        } else {
            setSelectedCategory(categoryName)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    return (
        <div className="min-h-screen">
            <Marquee text="READING IS FUNDAMENTAL • TOUCH GRASS LATER • SKIBIDI SCHOLAR • KNOWLEDGE IS POWER (AND RIZZ) • NO TL;DR HERE" />
            <Nav />

            {/* Forum Hero */}
            <header className="bg-[#fafafa] border-b-2 border-black py-20 px-6 relative overflow-hidden">
                <div className="absolute top-10 right-10 rotate-12 bg-lime-400 border-2 border-black p-4 shadow-[4px_4px_0px_0px_black] hidden md:block z-10">
                    <p className="font-bold text-xs uppercase">Certified Brainrot</p>
                </div>

                <div className="max-w-7xl mx-auto relative z-20">
                    <span className="bg-black text-white px-3 py-1 text-xs font-mono mb-6 uppercase tracking-widest border border-black inline-block">
                        The Forum
                    </span>
                    <h1 className="font-syne text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-6">
                        THE<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600" style={{ WebkitTextStroke: '2px black' }}>
                            FORUM.
                        </span>
                    </h1>
                    <p className="text-xl font-medium max-w-xl leading-relaxed tracking-tight border-l-4 border-yellow-400 pl-4">
                        Deep dives into furniture theory, sitting mechanics, and why your back hurts. Reading level: Grade 3 (Optimized).
                    </p>
                </div>
            </header>

            {/* Content Layout */}
            <div className="flex flex-col lg:flex-row border-b-2 border-black bg-white min-h-screen">
                {/* Sidebar / Filters */}
                <aside className="lg:w-1/4 lg:border-b-0 lg:border-r-2 sticky z-10 bg-yellow-400 w-full h-fit border-black border-b-2 pt-8 pr-8 pb-8 pl-8 top-0">
                    <div className="mb-8">
                        <h3 className="font-syne text-2xl font-bold uppercase mb-4 flex items-center gap-2">
                            <iconify-icon icon="lucide:filter" width="20"></iconify-icon>
                            Topics
                        </h3>
                        <nav className="flex flex-col gap-3">
                            {categories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleCategoryClick(cat.name)}
                                    className={`flex justify-between items-center font-bold text-sm border-2 border-black p-3 shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_black] transition-all ${selectedCategory === cat.name ? 'bg-black text-white' : 'bg-white'
                                        }`}
                                >
                                    <span>{cat.name}</span>
                                    <span className={`px-2 py-0.5 text-xs ${selectedCategory === cat.name ? 'bg-white text-black' : 'bg-black text-white'
                                        }`}>
                                        {cat.count}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="border-t-2 border-black pt-8">
                        <h3 className="font-syne text-xl font-bold uppercase mb-4">Trending</h3>
                        <div className="flex flex-wrap gap-2">
                            {trendingTags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="border border-black bg-white px-2 py-1 text-xs font-bold hover:bg-black hover:text-white cursor-pointer transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-full lg:w-3/4 bg-[#fafafa]">
                    {loading ? (
                        <div className="p-8 text-center">
                            <p className="text-xl font-bold">Loading brainrot...</p>
                        </div>
                    ) : (
                        <>
                            {/* Featured Post */}
                            {featuredPost && page === 1 && (
                                <Link
                                    to={`/forum/${featuredPost.slug}`}
                                    className="border-b-2 border-black group relative overflow-hidden block"
                                >
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-10 transition-opacity z-10 pointer-events-none"></div>

                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <div className="h-64 md:h-auto border-b-2 md:border-b-0 md:border-r-2 border-black relative overflow-hidden">
                                            <img
                                                src={featuredPost.featured_image}
                                                alt={featuredPost.title}
                                                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                            />
                                            <div className={`absolute top-4 left-4 ${featuredPost.category_bg_color} border-2 border-black px-3 py-1 text-xs font-bold z-20`}>
                                                FEATURED
                                            </div>
                                        </div>
                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">
                                                <iconify-icon icon="lucide:user" width="14"></iconify-icon>
                                                {featuredPost.display_name || featuredPost.username}
                                                <span className="w-1 h-1 bg-black rounded-full"></span>
                                                <iconify-icon icon="lucide:calendar" width="14"></iconify-icon>
                                                {formatDate(featuredPost.published_at)}
                                                <span className="w-1 h-1 bg-black rounded-full"></span>
                                                {featuredPost.read_time} Min Read
                                            </div>
                                            <h2 className="font-syne text-4xl font-bold leading-none mb-6 group-hover:text-pink-600 transition-colors">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                                                {featuredPost.excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 mb-6">
                                                <span className="flex items-center gap-1 text-sm font-bold">
                                                    <iconify-icon icon="lucide:heart" width="16"></iconify-icon>
                                                    {featuredPost.likes_count}
                                                </span>
                                                <span className="flex items-center gap-1 text-sm font-bold">
                                                    <iconify-icon icon="lucide:message-circle" width="16"></iconify-icon>
                                                    {featuredPost.comments_count}
                                                </span>
                                            </div>
                                            <span className="inline-flex items-center gap-2 font-bold uppercase text-sm border-b-2 border-black pb-1 group-hover:text-pink-600 group-hover:border-pink-600 transition-colors w-fit">
                                                Read Full Post
                                                <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Grid Posts */}
                            {posts.length > 0 ? (
                                <>
                                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {posts.map((post) => (
                                            <Link
                                                key={post.id}
                                                to={`/forum/${post.slug}`}
                                                className="brutalist-card bg-white border-2 border-black shadow-[6px_6px_0px_0px_black] flex flex-col h-full"
                                            >
                                                <div className="h-48 border-b-2 border-black overflow-hidden relative">
                                                    <img
                                                        src={post.featured_image}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                                    />
                                                    <div className={`absolute bottom-2 right-2 ${post.category_bg_color} border border-black px-2 py-1 text-[10px] font-bold uppercase`}>
                                                        {post.category}
                                                    </div>
                                                </div>
                                                <div className="p-6 flex flex-col flex-grow">
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                                        <iconify-icon icon="lucide:user" width="12"></iconify-icon>
                                                        <span className="font-bold">{post.display_name || post.username}</span>
                                                    </div>
                                                    <h3 className="font-syne text-2xl font-bold leading-tight mb-3">{post.title}</h3>
                                                    <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                                                        {post.excerpt}
                                                    </p>
                                                    {post.hashtags && post.hashtags.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mb-4">
                                                            {post.hashtags.slice(0, 3).map((tag, idx) => (
                                                                <span key={idx} className="text-xs text-gray-500">#{tag.tag}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <div className="mt-auto flex justify-between items-center pt-4 border-t-2 border-black/10">
                                                        <div className="flex items-center gap-3">
                                                            <span className="flex items-center gap-1 text-xs font-bold">
                                                                <iconify-icon icon="lucide:heart" width="14"></iconify-icon>
                                                                {post.likes_count}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-xs font-bold">
                                                                <iconify-icon icon="lucide:message-circle" width="14"></iconify-icon>
                                                                {post.comments_count}
                                                            </span>
                                                        </div>
                                                        <iconify-icon
                                                            icon="lucide:arrow-up-right"
                                                            width="20"
                                                            className="text-xl hover:rotate-45 transition-transform"
                                                        ></iconify-icon>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Load More Button */}
                                    {hasMore && (
                                        <div className="p-8 pt-0 flex justify-center">
                                            <button
                                                onClick={handleLoadMore}
                                                disabled={loadingMore}
                                                className="w-full md:w-auto px-12 py-4 bg-black text-white font-syne text-xl font-bold uppercase tracking-widest hover:bg-lime-400 hover:text-black border-2 border-black transition-colors shadow-[4px_4px_0px_0px_#888] disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loadingMore ? 'Loading...' : 'Load More Brainrot'}
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="p-8 text-center">
                                    <p className="text-xl font-bold">No posts found in this category.</p>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            <Newsletter />
            <Footer />
        </div>
    )
}

export default Forum
