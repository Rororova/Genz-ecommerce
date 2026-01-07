import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout/details');
    };

    return (
        <div className="min-h-screen">
            <Marquee text="SECURE THE BAG • NO CAP • BUY NOW CRY LATER • INVEST IN YOURSELF • 100% AUTHENTIC RIZZ • FREE SHIPPING (TO OHIO)" />
            <Nav />

            <header className="bg-[#fafafa] border-b-2 border-black py-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="font-syne text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                        YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600" style={{ WebkitTextStroke: '2px black' }}>
                            STASH.
                        </span>
                    </h1>
                </div>
            </header>

            <section className="py-12 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-8 text-sm font-bold opacity-50">
                        <Link to="/" className="hover:underline">HOME</Link>
                        <span>/</span>
                        <span className="opacity-100 text-black">CART</span>
                    </div>

                    {cart.length === 0 ? (
                        <div className="text-center py-20 border-2 border-black bg-gray-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="font-syne text-3xl font-bold mb-4">YOUR CART IS EMPTY</h2>
                            <p className="text-gray-500 mb-8">Imagine not owning cool chairs. Couldn't be me.</p>
                            <Link
                                to="/products"
                                className="inline-block px-8 py-4 bg-black text-white font-bold uppercase tracking-wider border-2 border-black hover:bg-lime-400 hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Go Shop
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Cart Items */}
                            <div className="flex-grow space-y-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row gap-6 border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="w-full sm:w-32 h-32 bg-gray-100 border-2 border-black flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                                            />
                                        </div>

                                        <div className="flex-grow flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-syne text-xl font-bold">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">{item.description && item.description.substring(0, 50)}...</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 border-2 border-transparent hover:border-red-500 transition-all"
                                                    title="Remove"
                                                >
                                                    <iconify-icon icon="lucide:trash-2" width="20"></iconify-icon>
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-end mt-4">
                                                <div className="flex items-center border-2 border-black bg-white">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-200 transition-colors"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-10 text-center font-mono font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-200 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span className="font-mono text-xl font-bold">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="lg:w-1/3 flex-shrink-0">
                                <div className="bg-yellow-400 border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-24">
                                    <h2 className="font-syne text-2xl font-bold mb-6 uppercase border-b-2 border-black pb-4">Order Summary</h2>

                                    <div className="space-y-3 mb-6 font-mono">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>${getCartTotal().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700">
                                            <span>Shipping</span>
                                            <span>FREE (OHIO ONLY)</span>
                                        </div>
                                        <div className="flex justify-between font-bold text-lg pt-4 border-t-2 border-black">
                                            <span>Total</span>
                                            <span>${getCartTotal().toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="w-full py-4 bg-black text-white font-bold uppercase tracking-wider border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#fff]"
                                    >
                                        Proceed to Checkout
                                    </button>
                                    <p className="text-center text-xs mt-4 font-bold opacity-70">
                                        SECURED BY BASIC MATH
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Cart;
