import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Marquee from '../components/Marquee'

const ArticleDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/articles/${slug}`)
        const data = await response.json()

        if (data.success) {
          setArticle(data.data)
        } else {
          setError('Article not found')
        }
      } catch (err) {
        setError('Failed to load article')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

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

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Marquee text="READING IS FUNDAMENTAL • TOUCH GRASS LATER • SKIBIDI SCHOLAR • KNOWLEDGE IS POWER (AND RIZZ) • NO TL;DR HERE" />
        <Nav />
        <div className="text-center py-20">
          <h1 className="font-syne text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-yellow-400 hover:underline">
            Back to Blog
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
            <Link to="/blog" className="hover:underline">Blog</Link>
            <span>/</span>
            <span className="text-gray-600 line-clamp-1">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-[#fafafa] border-b-2 border-black py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">
            <iconify-icon icon="lucide:calendar" width="14"></iconify-icon>
            {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            <span className="w-1 h-1 bg-black rounded-full"></span>
            {article.read_time} Min Read
            <span className="w-1 h-1 bg-black rounded-full"></span>
            {article.views} views
          </div>

          <h1 className="font-syne text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className={`${article.category_bg_color} border-2 border-black px-3 py-1 text-xs font-bold uppercase`}>
              {article.category}
            </span>
            <span className="text-sm font-medium text-gray-600">by {article.author}</span>
          </div>

          {article.hashtags && article.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.hashtags.map((tag, idx) => (
                <Link
                  key={idx}
                  to={`/blog?hashtag=${tag.slug}`}
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
      {article.featured_image && (
        <div className="border-b-2 border-black">
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-[60vh] object-cover grayscale contrast-125"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-lg max-w-none font-medium leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.75rem'
            }}
          />
        </div>
      </article>

      {/* Navigation */}
      <div className="bg-yellow-400 border-y-2 border-black py-12 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider text-sm hover:bg-lime-400 hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_#000]"
          >
            ← Back to Blog
          </button>
          <Link
            to="/blog"
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

export default ArticleDetail

