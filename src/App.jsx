import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import ArticleDetail from './pages/ArticleDetail'
import Forum from './pages/Forum'
import ForumPostDetail from './pages/ForumPostDetail'
import CreatePost from './pages/CreatePost'
import Auth from './pages/Auth'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Keep old blog routes for backward compatibility */}
        <Route path="/blog" element={<Forum />} />
        <Route path="/blog/:slug" element={<ForumPostDetail />} />
        {/* New forum routes */}
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:slug" element={<ForumPostDetail />} />
        <Route path="/forum/create" element={<CreatePost />} />
        {/* Auth routes */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        {/* Product routes */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  )
}

export default App


