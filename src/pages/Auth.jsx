import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Marquee from '../components/Marquee'

const Auth = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        displayName: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
            const body = isLogin
                ? { username: formData.username, password: formData.password }
                : formData

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

            const data = await response.json()

            if (data.success) {
                if (isLogin) {
                    localStorage.setItem('auth_token', data.data.token)
                    localStorage.setItem('user_data', JSON.stringify(data.data.user))
                    navigate('/forum')
                } else {
                    setIsLogin(true)
                    setError('Account created! Please login.')
                }
            } else {
                setError(data.message || 'An error occurred')
            }
        } catch (err) {
            setError('Failed to connect to server')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen">
            <Marquee text="JOIN THE CLUB • BECOME A MEMBER • SIGMA GRINDSET • CHAIR ENTHUSIASTS ONLY • NO BETAS ALLOWED" />
            <Nav />

            {/* Hero */}
            <header className="bg-[#fafafa] border-b-2 border-black py-20 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="font-syne text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-6">
                        {isLogin ? (
                            <>
                                WELCOME<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600" style={{ WebkitTextStroke: '2px black' }}>
                                    BACK.
                                </span>
                            </>
                        ) : (
                            <>
                                JOIN<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-600" style={{ WebkitTextStroke: '2px black' }}>
                                    US.
                                </span>
                            </>
                        )}
                    </h1>
                    <p className="text-xl font-medium max-w-xl mx-auto leading-relaxed">
                        {isLogin
                            ? 'Sign in to join the discussion, like posts, and share your thoughts.'
                            : 'Create an account to become part of the COOL CHAIR community.'}
                    </p>
                </div>
            </header>

            {/* Form */}
            <div className="py-20 px-6 bg-white">
                <div className="max-w-md mx-auto">
                    <div className="bg-yellow-400 border-2 border-black p-8 shadow-[8px_8px_0px_0px_black]">
                        <div className="flex gap-2 mb-8">
                            <button
                                onClick={() => {
                                    setIsLogin(true)
                                    setError('')
                                }}
                                className={`flex-1 py-3 font-bold uppercase text-sm border-2 border-black transition-colors ${isLogin ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    setIsLogin(false)
                                    setError('')
                                }}
                                className={`flex-1 py-3 font-bold uppercase text-sm border-2 border-black transition-colors ${!isLogin ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'
                                    }`}
                            >
                                Register
                            </button>
                        </div>

                        {error && (
                            <div className={`mb-6 p-4 border-2 border-black ${error.includes('created') ? 'bg-lime-400' : 'bg-pink-500 text-white'
                                } font-bold`}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block font-bold mb-2 uppercase text-sm">
                                    Username {!isLogin && <span className="text-xs">(or Email)</span>}
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Enter username"
                                />
                            </div>

                            {!isLogin && (
                                <>
                                    <div>
                                        <label className="block font-bold mb-2 uppercase text-sm">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold mb-2 uppercase text-sm">
                                            Display Name <span className="text-xs">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="displayName"
                                            value={formData.displayName}
                                            onChange={handleChange}
                                            className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="How should we call you?"
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block font-bold mb-2 uppercase text-sm">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-2 border-black p-3 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Enter password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-black text-white font-bold uppercase tracking-wider text-lg hover:bg-lime-400 hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t-2 border-black">
                            <p className="text-center font-medium">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => {
                                        setIsLogin(!isLogin)
                                        setError('')
                                    }}
                                    className="font-bold underline hover:no-underline"
                                >
                                    {isLogin ? 'Register here' : 'Login here'}
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-8 bg-lime-400 border-2 border-black p-6 shadow-[4px_4px_0px_0px_black]">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <iconify-icon icon="lucide:info" width="20"></iconify-icon>
                            Why Create an Account?
                        </h3>
                        <ul className="space-y-2 text-sm font-medium">
                            <li className="flex items-start gap-2">
                                <iconify-icon icon="lucide:check" width="16" className="mt-0.5"></iconify-icon>
                                <span>Comment on forum posts</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <iconify-icon icon="lucide:check" width="16" className="mt-0.5"></iconify-icon>
                                <span>Like posts and comments</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <iconify-icon icon="lucide:check" width="16" className="mt-0.5"></iconify-icon>
                                <span>Join the COOL CHAIR community</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <iconify-icon icon="lucide:check" width="16" className="mt-0.5"></iconify-icon>
                                <span>Get exclusive updates (maybe)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Auth
