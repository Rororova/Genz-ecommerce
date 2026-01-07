import { X, ShoppingCart, Check } from 'lucide-react';
import { products } from '../data/products';

interface ProductDetailProps {
  productId: number;
  onClose: () => void;
  onAddToCart: (id: number) => void;
}

export default function ProductDetail({ productId, onClose, onAddToCart }: ProductDetailProps) {
  const product = products.find(p => p.id === productId);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-lg">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500 mb-1">Material</p>
                <p className="font-semibold text-gray-900">{product.material}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Dimensions</p>
                <p className="font-semibold text-gray-900">{product.dimensions}</p>
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(product.id);
                onClose();
              }}
              className="w-full py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
