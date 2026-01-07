import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Marquee from '../components/Marquee'
import { getProductById } from '../data/products'

const ProductDetail = () => {
  const { id } = useParams()
  const product = getProductById(id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen">
        <Marquee text="NO CAP • FREE SHIPPING TO OHIO • LEVEL 100 GYATT • SKIBIDI RIZZ CERTIFIED • MOG YOUR NEIGHBORS • FANUM TAX INCLUDED" />
        <Nav />
        <div className="text-center py-20">
          <h1 className="font-syne text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-yellow-400 hover:underline">
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    alert(`Added ${quantity} ${product.name}(s) to cart!`)
  }

  return (
    <div className="min-h-screen">
      <Marquee text="NO CAP • FREE SHIPPING TO OHIO • LEVEL 100 GYATT • SKIBIDI RIZZ CERTIFIED • MOG YOUR NEIGHBORS • FANUM TAX INCLUDED" />
      <Nav />

      {/* Breadcrumb */}
      <div className="bg-[#fafafa] border-b-2 border-black px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex gap-2 text-sm font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:underline">Products</Link>
            <span>/</span>
            <span className="text-gray-600">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Image Gallery */}
            <div>
              <div className="border-2 border-black mb-4 relative overflow-hidden aspect-square">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div className={`absolute top-4 left-4 ${product.badgeColor} text-xs font-bold px-3 py-1 border-2 border-black`}>
                    {product.badge}
                  </div>
                )}
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`border-2 ${selectedImage === idx ? 'border-black' : 'border-gray-300'} w-24 h-24 overflow-hidden`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="font-syne text-5xl md:text-6xl font-bold tracking-tighter mb-4">
                {product.name}
              </h1>
              
              <div className="mb-6">
                <span className="font-mono text-4xl font-bold">${product.price.toFixed(2)}</span>
              </div>

              <p className="text-lg font-medium text-gray-700 mb-8 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Stock Status */}
              <div className="mb-8">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <span className="bg-lime-400 px-3 py-1 border-2 border-black">
                      IN STOCK ({product.stock} available)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <span className="bg-red-500 text-white px-3 py-1 border-2 border-black">
                      OUT OF STOCK
                    </span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-bold mb-2">QUANTITY</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border-2 border-black bg-white hover:bg-yellow-400 font-bold text-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 border-2 border-black bg-white hover:bg-yellow-400 font-bold text-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full py-4 bg-black text-white font-bold uppercase tracking-wider text-lg hover:bg-lime-400 hover:text-black transition-colors border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
                >
                  {product.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
                </button>
              </div>

              {/* Features */}
              <div className="border-2 border-black p-6 bg-yellow-400 mb-8">
                <h3 className="font-bold text-xl mb-4">KEY FEATURES</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <iconify-icon icon="lucide:check" width="20" className="text-black"></iconify-icon>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="border-2 border-black p-6 bg-white">
                <h3 className="font-bold text-xl mb-4">SPECIFICATIONS</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Dimensions:</dt>
                    <dd className="text-gray-700">{product.specifications.dimensions}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Weight:</dt>
                    <dd className="text-gray-700">{product.specifications.weight}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Material:</dt>
                    <dd className="text-gray-700">{product.specifications.material}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Color:</dt>
                    <dd className="text-gray-700">{product.specifications.color}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Warranty:</dt>
                    <dd className="text-gray-700">{product.specifications.warranty}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 px-6 bg-[#fafafa] border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-syne text-4xl font-bold mb-12 text-center uppercase">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* This would typically show related products */}
            <div className="text-center text-gray-500">
              <p>More products coming soon...</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ProductDetail

