import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import Marquee from '../components/Marquee'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Marquee text="PREMIUM QUALITY • FREE SHIPPING • MAXIMUM COMFORT • CERTIFIED STYLE • UPGRADE YOUR SPACE • AUTHENTIC DESIGN" />
      <Nav />

      {/* Hero Section */}
      <header className="relative w-full border-b-2 border-black bg-[#fafafa] flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-start border-b-2 lg:border-b-0 lg:border-r-2 border-black relative">
          <div className="absolute top-10 right-10 rotate-12 bg-lime-400 text-black px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-xs uppercase z-10 hidden md:block">
            Approved by Experts
          </div>

          <span className="bg-black text-white px-3 py-1 text-xs font-mono mb-6 uppercase tracking-widest border border-black">
            Statement Piece
          </span>

          <h1 className="font-syne text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
            THE CHAIR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600" style={{ WebkitTextStroke: '2px black' }}>
              TO WATCH.
            </span>
          </h1>

          <p className="text-lg font-medium text-gray-800 mb-8 max-w-md leading-relaxed tracking-tight">
            Sit in the corner like a leader. The ultimate ergonomic solution for observing the situation. Zero effort required, 100% comfort guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              to="/products"
              className="glitch-hover w-full sm:w-auto px-8 py-4 bg-yellow-400 border-2 border-black text-black font-bold text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-all"
            >
              SHOP NOW
              <iconify-icon icon="lucide:arrow-right" width="20"></iconify-icon>
            </Link>
            <Link
              to="/blog"
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-black text-black font-bold text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all text-center"
            >
              READ THE LORE
            </Link>
          </div>
        </div>

        <div
          className="w-full lg:w-1/2 bg-cover bg-center min-h-[500px] relative filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-yellow-400 mix-blend-multiply opacity-40"></div>

          <div className="absolute bottom-10 left-10 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <iconify-icon icon="lucide:eye" className="text-black"></iconify-icon>
              <span className="font-bold text-xs uppercase">Vantage Point</span>
            </div>
            <p className="text-xs font-medium text-gray-600 leading-tight">
              Optimized angles for maximum awkward eye contact.
            </p>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full border-2 border-white animate-bounce">
            <iconify-icon icon="lucide:arrow-down" width="32"></iconify-icon>
          </div>
        </div>
      </header>

      {/* Ticker Tape Divider */}
      <div className="bg-lime-400 border-b-2 border-black py-4 overflow-hidden">
        <div className="flex gap-12 animate-marquee items-center font-syne text-2xl font-bold uppercase tracking-tighter">
          <span>Don't be the main character</span>
          <iconify-icon icon="lucide:star" className="text-black"></iconify-icon>
          <span>Be the audience</span>
          <iconify-icon icon="lucide:star" className="text-black"></iconify-icon>
          <span>Sit. Watch. judge.</span>
          <iconify-icon icon="lucide:star" className="text-black"></iconify-icon>
          <span>Emotional Support Furniture</span>
          <iconify-icon icon="lucide:star" className="text-black"></iconify-icon>
          <span>Don't be the main character</span>
          <iconify-icon icon="lucide:star" className="text-black"></iconify-icon>
          <span>Be the audience</span>
          <iconify-icon icon="lucide:star" className="text-black"></iconify-icon>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tighter mb-2 uppercase">
                The Collection
              </h2>
              <p className="text-gray-500 font-medium">Curated for your viewing pleasure.</p>
            </div>

            <div className="flex gap-2">
              <Link
                to="/products"
                className="px-4 py-2 border-2 border-black bg-black text-white font-bold text-sm shadow-[2px_2px_0px_0px_#888] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                VIEW ALL
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1 */}
            <Link to="/products/1" className="brutalist-card group bg-white border-2 border-black relative flex flex-col shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute top-4 left-4 z-10 bg-pink-500 text-white text-xs font-bold px-2 py-1 border-2 border-black">
                BEST SELLER
              </div>
              <div className="relative h-64 overflow-hidden border-b-2 border-black bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1965&auto=format&fit=crop"
                  alt="The Hotel C-Class"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 border border-black">
                  LEGIT
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-syne text-xl font-bold tracking-tight">The Hotel C-Class</h3>
                  <span className="font-mono text-lg font-bold">$420.69</span>
                </div>
                <p className="text-sm text-gray-500 mb-6 leading-snug">
                  Classic design for the modern home. Perfect for brooding in the shadows while scrolling social media.
                </p>
              </div>
            </Link>

            {/* Product 2 */}
            <Link to="/products/2" className="brutalist-card group bg-white border-2 border-black relative flex flex-col shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute top-4 left-4 z-10 bg-lime-400 text-black text-xs font-bold px-2 py-1 border-2 border-black">
                TRENDING
              </div>
              <div className="relative h-64 overflow-hidden border-b-2 border-black bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1974&auto=format&fit=crop"
                  alt="The Voyager V2"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-syne text-xl font-bold tracking-tight">The Voyager V2</h3>
                  <span className="font-mono text-lg font-bold">$299.00</span>
                </div>
                <p className="text-sm text-gray-500 mb-6 leading-snug">
                  White aesthetic for the minimalist observer. Stain resistant and durable.
                </p>
              </div>
            </Link>

            {/* Product 3 */}
            <Link to="/products/3" className="brutalist-card group bg-white border-2 border-black relative flex flex-col shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-black text-xs font-bold px-2 py-1 border-2 border-black">
                LOW STOCK
              </div>
              <div className="relative h-64 overflow-hidden border-b-2 border-black bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1974&auto=format&fit=crop"
                  alt="The Fold-Out"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-syne text-xl font-bold tracking-tight">The Fold-Out</h3>
                  <span className="font-mono text-lg font-bold">$69.99</span>
                </div>
                <p className="text-sm text-gray-500 mb-6 leading-snug">
                  Portable coolness. Bring the vibe to any location. Extremely squeaky.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Manifesto */}
      <section className="bg-yellow-400 border-y-2 border-black py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="font-syne text-5xl md:text-7xl font-bold text-center tracking-tighter mb-16 leading-[0.9]">
            WHY YOU NEED <br /> <span className="bg-white px-2 border-2 border-black shadow-[4px_4px_0px_0px_#000]">THE CHAIR</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:rotate-1 transition-transform">
              <div className="w-12 h-12 bg-black text-yellow-400 flex items-center justify-center border-2 border-black mb-4">
                <iconify-icon icon="lucide:glasses" width="24" strokeWidth="1.5"></iconify-icon>
              </div>
              <h3 className="font-bold text-xl mb-2 tracking-tight">HD Vision</h3>
              <p className="text-sm text-gray-600">Scientifically positioned height for optimal viewing angles. Don't miss a single frame.</p>
            </div>

            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-rotate-1 transition-transform mt-0 md:-mt-8">
              <div className="w-12 h-12 bg-lime-400 text-black flex items-center justify-center border-2 border-black mb-4">
                <iconify-icon icon="lucide:croissant" width="24" strokeWidth="1.5"></iconify-icon>
              </div>
              <h3 className="font-bold text-xl mb-2 tracking-tight">Snack Compatible</h3>
              <p className="text-sm text-gray-600">Wide armrests designed specifically for holding popcorn and coping mechanisms.</p>
            </div>

            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:rotate-1 transition-transform">
              <div className="w-12 h-12 bg-pink-500 text-white flex items-center justify-center border-2 border-black mb-4">
                <iconify-icon icon="lucide:ghost" width="24" strokeWidth="1.5"></iconify-icon>
              </div>
              <h3 className="font-bold text-xl mb-2 tracking-tight">Invisibility Cloak</h3>
              <p className="text-sm text-gray-600">Blend into the background so effectively they'll forget you're even in the room. Spooky.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-[#fafafa] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne text-4xl font-bold mb-12 text-center uppercase">Vibes</h2>

          <div className="space-y-6">
            <div className="border-2 border-black p-6 bg-white flex gap-4 items-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-pink-100 border-2 border-black rounded-full overflow-hidden flex-shrink-0">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie" alt="User" className="w-full h-full" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">Sophie_Reads</span>
                  <span className="text-xs bg-yellow-400 px-1 border border-black font-bold">VERIFIED BUYER</span>
                </div>
                <div className="flex text-yellow-500 mb-2 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <iconify-icon key={i} icon="lucide:star" width="14" fill="currentColor"></iconify-icon>
                  ))}
                </div>
                <p className="text-sm text-gray-800 italic">
                  "I bought this for my reading nook and it's absolutely perfect. The most cozy spot to curl up with a cup of tea and a good book. It feels like a hug!"
                </p>
              </div>
            </div>

            <div className="border-2 border-black p-6 bg-white flex gap-4 items-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-4 md:translate-x-12">
              <div className="w-12 h-12 bg-lime-100 border-2 border-black rounded-full overflow-hidden flex-shrink-0">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver" alt="User" className="w-full h-full" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">OliverCreates</span>
                  <span className="text-xs bg-lime-400 px-1 border border-black font-bold">LOVE IT</span>
                </div>
                <div className="flex text-yellow-500 mb-2 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <iconify-icon key={i} icon="lucide:star" width="14" fill="currentColor"></iconify-icon>
                  ))}
                </div>
                <p className="text-sm text-gray-800 italic">
                  "Honestly the creative vibes this chair gives are unmatched. It completely transformed my studio space. Plus, my cat has claimed it as her throne. 10/10 wholesome."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home

