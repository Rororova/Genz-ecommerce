import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Marquee from '../components/Marquee'

const CreatePost = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        category: 'LIFESTYLE',
        categoryBgColor: 'bg-yellow-400',
        featured: false,
        hashtags: ''
    })

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = () => {
        const token = localStorage.getItem('auth_token')
        const userData = localStorage.getItem('user_data')
        if (!token || !userData) {
            navigate('/login')
            return
        }
        const user = JSON.parse(userData)
        if (user.role !== 'moderator' && user.role !== 'admin') {
            navigate('/forum')
            return
        }
        setUser(user)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const token = localStorage.getItem('auth_token')
            const hashtags = formData.hashtags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)

            const response = await fetch('/api/forum/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    hashtags
                })
            })

            const data = await response.json()

            if (data.success) {
                setSuccess('Post created successfully!')
                setTimeout(() => {
                    navigate(`/forum/${data.data.slug}`)
                }, 1500)
            } else {
                setError(data.message || 'Failed to create post')
            }
        } catch (err) {
            setError('Failed to connect to server')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen">
            <Marquee text="MODERATOR ZONE • CREATE CONTENT • SPREAD THE WORD • QUALITY POSTING • CHAIR WISDOM" />
            <Nav />

            {/* Hero */}
            <header className="bg-[#fafafa] border-b-2 border-black py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-syne text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-4">
                        CREATE<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600" style={{ WebkitTextStroke: '2px black' }}>
                            POST.
                        </span>
                    </h1>
                    <p className="text-lg font-medium">
                        Share your wisdom with the COOL CHAIR community.
                    </p>
                </div>
            </header>

            {/* Form */}
            <div className="py-12 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    {error && (
                        <div className="mb-6 p-4 bg-pink-500 text-white border-2 border-black font-bold">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-lime-400 border-2 border-black font-bold">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Title */}
                        <div>
                            <label className="block font-bold mb-2 uppercase text-sm">Post Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border-2 border-black p-4 font-bold text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Enter an attention-grabbing title"
                            />
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block font-bold mb-2 uppercase text-sm">Excerpt *</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                required
                                rows="3"
                                className="w-full border-2 border-black p-4 font-medium resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="A brief summary that will appear in the post list"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block font-bold mb-2 uppercase text-sm">Content (HTML) *</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows="12"
                                className="w-full border-2 border-black p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="<p>Your content here. You can use HTML tags.</p>"
                            />
                            <p className="text-xs text-gray-600 mt-2">
                                Tip: Use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, etc.
                            </p>
                        </div>

                        {/* Featured Image */}
                        <div>
                            <label className="block font-bold mb-2 uppercase text-sm">Featured Image URL</label>
                            <input
                                type="url"
                                name="featuredImage"
                                value={formData.featuredImage}
                                onChange={handleChange}
                                className="w-full border-2 border-black p-4 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="https://example.com/image.jpg"
                            />
                            {formData.featuredImage && (
                                <div className="mt-4 border-2 border-black">
                                    <img
                                        src={formData.featuredImage}
                                        alt="Preview"
                                        className="w-full h-64 object-cover grayscale"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-bold mb-2 uppercase text-sm">Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-2 border-black p-4 font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option value="LIFESTYLE">LIFESTYLE</option>
                                    <option value="FURNITURE">FURNITURE</option>
                                    <option value="LATEST NEWS">LATEST NEWS</option>
                                    <option value="STYLE TIPS">STYLE TIPS</option>
                                    <option value="TECH">TECH</option>
                                    <option value="GENERAL">GENERAL</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-bold mb-2 uppercase text-sm">Category Badge Color</label>
                                <select
                                    name="categoryBgColor"
                                    value={formData.categoryBgColor}
                                    onChange={handleChange}
                                    className="w-full border-2 border-black p-4 font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option value="bg-yellow-400">Yellow</option>
                                    <option value="bg-lime-400">Lime</option>
                                    <option value="bg-pink-500 text-white">Pink</option>
                                    <option value="bg-blue-400">Blue</option>
                                    <option value="bg-purple-400">Purple</option>
                                    <option value="bg-orange-400">Orange</option>
                                </select>
                            </div>
                        </div>

                        {/* Hashtags */}
                        <div>
                            <label className="block font-bold mb-2 uppercase text-sm">Hashtags</label>
                            <input
                                type="text"
                                name="hashtags"
                                value={formData.hashtags}
                                onChange={handleChange}
                                className="w-full border-2 border-black p-4 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="PREMIUM, CHAIRS, LIFESTYLE (comma separated)"
                            />
                            <p className="text-xs text-gray-600 mt-2">
                                Separate hashtags with commas. They will be automatically formatted.
                            </p>
                        </div>

                        {/* Featured Checkbox */}
                        <div className="flex items-center gap-3 p-4 bg-yellow-400 border-2 border-black">
                            <input
                                type="checkbox"
                                name="featured"
                                id="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-6 h-6 border-2 border-black"
                            />
                            <label htmlFor="featured" className="font-bold cursor-pointer">
                                Mark as Featured Post (will appear at the top)
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-4 bg-black text-white font-bold uppercase tracking-wider text-lg hover:bg-lime-400 hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating Post...' : 'Publish Post'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/forum')}
                                className="px-8 py-4 bg-white border-2 border-black font-bold uppercase tracking-wider text-lg hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_#000]"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default CreatePost
