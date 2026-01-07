import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import DesignPhilosophy from './components/DesignPhilosophy';
import Sustainability from './components/Sustainability';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Techniques from './components/Techniques';

type Page = 'home' | 'about' | 'design' | 'sustainability' | 'techniques' | 'checkout' | 'confirmation';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ id: number; quantity: number }[]>([]);

  const addToCart = (productId: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigateTo('home')}
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Cuck Chair Architect
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigateTo('home')}
                className={`transition-colors ${currentPage === 'home' ? 'text-gray-900 font-semibold' : 'text-gray-700 hover:text-gray-900'}`}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('about')}
                className={`transition-colors ${currentPage === 'about' ? 'text-gray-900 font-semibold' : 'text-gray-700 hover:text-gray-900'}`}
              >
                About
              </button>
              <button
                onClick={() => navigateTo('design')}
                className={`transition-colors ${currentPage === 'design' ? 'text-gray-900 font-semibold' : 'text-gray-700 hover:text-gray-900'}`}
              >
                Design
              </button>
              <button
                onClick={() => navigateTo('sustainability')}
                className={`transition-colors ${currentPage === 'sustainability' ? 'text-gray-900 font-semibold' : 'text-gray-700 hover:text-gray-900'}`}
              >
                Sustainability
              </button>
              <button
                onClick={() => navigateTo('techniques')}
                className={`transition-colors ${currentPage === 'techniques' ? 'text-gray-900 font-semibold' : 'text-gray-700 hover:text-gray-900'}`}
              >
                Techniques
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => navigateTo('home')}
                  className="text-left text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className="text-left text-gray-700 hover:text-gray-900 transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => navigateTo('design')}
                  className="text-left text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Design
                </button>
                <button
                  onClick={() => navigateTo('sustainability')}
                  className="text-left text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Sustainability
                </button>
                <button
                  onClick={() => navigateTo('techniques')}
                  className="text-left text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Techniques
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-16">
        {currentPage === 'home' && (
          <>
            <Hero />
            <ProductGrid onProductClick={setSelectedProduct} onAddToCart={addToCart} />
          </>
        )}
        {currentPage === 'about' && <AboutUs />}
        {currentPage === 'design' && <DesignPhilosophy />}
        {currentPage === 'sustainability' && <Sustainability />}
        {currentPage === 'techniques' && <Techniques />}
        {currentPage === 'checkout' && (
          <Checkout
            cartItems={cartItems}
            onOrderComplete={() => {
              setCartItems([]);
              navigateTo('confirmation');
            }}
            onBack={() => navigateTo('home')}
          />
        )}
        {currentPage === 'confirmation' && (
          <OrderConfirmation onHome={() => navigateTo('home')} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      {selectedProduct !== null && (
        <ProductDetail
          productId={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
        onCheckout={() => {
          setIsCartOpen(false);
          navigateTo('checkout');
        }}
      />
    </div>
  );
}

export default App;
