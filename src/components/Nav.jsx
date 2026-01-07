import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { useCart } from '../context/CartContext'
const Nav = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { getCartCount } = useCart()
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    setUser(null)
    navigate('/')
  }

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path)

  return (
    <nav className="sticky top-0 z-40 bg-yellow-400 border-b-2 border-black px-6 py-4 flex justify-between items-center bg-opacity-90 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black flex items-center justify-center">
          <iconify-icon icon="lucide:armchair" className="text-yellow-400 text-lg"></iconify-icon>
        </div>
        <span className="font-syne text-2xl font-bold tracking-tighter leading-none">COOL.</span>
      </Link>

      <div className="hidden md:flex gap-8 font-medium text-sm tracking-tight">
        <Link
          to="/products"
          className={`hover:underline decoration-2 decoration-black underline-offset-4 ${isActive('/products') ? 'underline' : ''}`}
        >
          DROPS
        </Link>
        <Link
          to="/forum"
          className={`hover:underline decoration-2 decoration-black underline-offset-4 ${isActive('/forum') || isActive('/blog') ? 'underline' : ''}`}
        >
          FORUM
        </Link>
        <Link
          to="/about"
          className="hover:underline decoration-2 decoration-black underline-offset-4"
        >
          ABOUT
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        {user ? (
          <div className="flex items-center gap-3">
            {(user.role === 'moderator' || user.role === 'admin') && (
              <Link
                to="/forum/create"
                className="hidden md:flex items-center gap-2 bg-pink-500 text-white border-2 border-black px-4 py-2 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <iconify-icon icon="lucide:plus" width="16"></iconify-icon>
                CREATE POST
              </Link>
            )}
            <div className="hidden md:flex items-center gap-2 bg-white border-2 border-black px-3 py-1">
              <div className="w-6 h-6 bg-lime-400 border border-black flex items-center justify-center text-xs font-bold">
                {user.display_name?.[0] || user.username?.[0] || 'U'}
              </div>
              <span className="text-sm font-bold">{user.display_name || user.username}</span>
              {(user.role === 'moderator' || user.role === 'admin') && (
                <span className="bg-pink-500 text-white px-2 py-0.5 text-xs font-bold uppercase">
                  {user.role}
                </span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-black text-white border-2 border-black px-4 py-2 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-white border-2 border-black px-4 py-2 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
          >
            LOGIN
            <iconify-icon icon="lucide:user" width="16"></iconify-icon>
          </Link>
        )}
        <Link to="/cart" className="relative bg-white border-2 border-black px-4 py-2 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2">
          CART ({getCartCount()})
          <iconify-icon icon="lucide:shopping-bag" width="16"></iconify-icon>
        </Link>
      </div>
    </nav>
  )
}

export default Nav


