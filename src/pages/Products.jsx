import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Marquee from '../components/Marquee'
import { products } from '../data/products'

const Products = () => {
  const [filter, setFilter] = useState('all')

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter.toLowerCase())

  return (
    <div className="min-h-screen">
      <Marquee text="NO CAP • FREE SHIPPING TO OHIO • LEVEL 100 GYATT • SKIBIDI RIZZ CERTIFIED • MOG YOUR NEIGHBORS • FANUM TAX INCLUDED" />
      <Nav />

      {/* Hero Section */}
      <header className="bg-[#fafafa] border-b-2 border-black py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-syne text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            THE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600" style={{WebkitTextStroke: '2px black'}}>
              COLLECTION
            </span>
          </h1>
          <p className="text-lg font-medium text-gray-700 max-w-2xl mx-auto">
            Curated chairs for your viewing pleasure. Each one designed with the serious observer in mind.
          </p>
        </div>
      </header>

      {/* Product Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tighter mb-2 uppercase">
                All Products
              </h2>
              <p className="text-gray-500 font-medium">Showing {filteredProducts.length} products</p>
            </div>
            
            {/* Filter */}
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_0px_#888] transition-all ${
                  filter === 'all' 
                    ? 'bg-black text-white' 
                    : 'bg-white hover:bg-yellow-100'
                }`}
              >
                ALL
              </button>
              <button 
                onClick={() => setFilter('velvet')}
                className={`px-4 py-2 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_0px_#000] transition-all ${
                  filter === 'velvet' 
                    ? 'bg-black text-white' 
                    : 'bg-white hover:bg-yellow-100'
                }`}
              >
                VELVET
              </button>
              <button 
                onClick={() => setFilter('leather')}
                className={`px-4 py-2 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_0px_#000] transition-all ${
                  filter === 'leather' 
                    ? 'bg-black text-white' 
                    : 'bg-white hover:bg-yellow-100'
                }`}
              >
                LEATHER
              </button>
              <button 
                onClick={() => setFilter('fabric')}
                className={`px-4 py-2 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_0px_#000] transition-all ${
                  filter === 'fabric' 
                    ? 'bg-black text-white' 
                    : 'bg-white hover:bg-yellow-100'
                }`}
              >
                FABRIC
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-bold">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Link 
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="brutalist-card group bg-white border-2 border-black relative flex flex-col shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  {product.badge && (
                    <div className={`absolute top-4 left-4 z-10 ${product.badgeColor} text-xs font-bold px-2 py-1 border-2 border-black`}>
                      {product.badge}
                    </div>
                  )}
                  <div className="relative h-64 overflow-hidden border-b-2 border-black bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.stock < 5 && product.stock > 0 && (
                      <div className="absolute bottom-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 border border-black">
                        {product.stock} LEFT
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-syne text-xl font-bold tracking-tight">{product.name}</h3>
                      <span className="font-mono text-lg font-bold">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-6 leading-snug">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          // TODO: Add to cart functionality
                        }}
                        className="w-full py-3 bg-black text-white font-bold uppercase tracking-wider text-sm hover:bg-lime-400 hover:text-black transition-colors border border-black"
                      >
                        {product.stock > 0 ? 'View Details' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Products

