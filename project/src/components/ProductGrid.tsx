import { ShoppingCart, Eye } from 'lucide-react';
import { products } from '../data/products';

interface ProductGridProps {
  onProductClick: (id: number) => void;
  onAddToCart: (id: number) => void;
}

export default function ProductGrid({ onProductClick, onAddToCart }: ProductGridProps) {
  return (
    <section id="chairs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked designs that transform spaces into experiences
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button
                    onClick={() => onProductClick(product.id)}
                    className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors transform hover:scale-110"
                  >
                    <Eye className="w-5 h-5 text-gray-900" />
                  </button>
                  <button
                    onClick={() => onAddToCart(product.id)}
                    className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors transform hover:scale-110"
                  >
                    <ShoppingCart className="w-5 h-5 text-gray-900" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <button
                    onClick={() => onAddToCart(product.id)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
