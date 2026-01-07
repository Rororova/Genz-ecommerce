import { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: 'Welcome to the CUCK CLUB! 🎉' })
        setEmail('')
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong. Try again.' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to subscribe. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-black text-white py-20 px-6 border-t-2 border-white relative overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" className="absolute top-10 left-10 text-yellow-400 opacity-50">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4"></path>
          <circle cx="4" cy="20" r="2"></circle>
        </g>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" className="absolute bottom-10 right-10 text-lime-400 opacity-50">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
      </svg>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="font-syne text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          JOIN THE CUCK CLUB
        </h2>
        <p className="text-gray-400 mb-8 font-medium">
          Get notified when we drop new furniture for watching people. We won't spam you (we like to watch too).
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="YOUR EMAIL..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow bg-white border-2 border-yellow-400 p-4 text-black font-bold placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-black px-8 py-4 font-bold border-2 border-yellow-400 hover:bg-white hover:text-black transition-colors uppercase tracking-wider whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status && (
          <div className={`mt-4 p-4 border-2 ${
            status.type === 'success' 
              ? 'border-lime-400 bg-lime-400/10 text-lime-400' 
              : 'border-red-400 bg-red-400/10 text-red-400'
          } font-bold`}>
            {status.message}
          </div>
        )}
      </div>
    </section>
  )
}

export default Newsletter

