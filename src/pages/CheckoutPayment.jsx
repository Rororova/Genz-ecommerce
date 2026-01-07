import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const CheckoutPayment = () => {
    const { getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState(null);
    const [showTemplatePopup, setShowTemplatePopup] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/login');
            return;
        }

        const savedDetails = localStorage.getItem('checkout_details');
        if (!savedDetails) {
            navigate('/checkout/details');
        } else {
            setDetails(JSON.parse(savedDetails));
        }
    }, [navigate]);

    const handlePaymentClick = () => {
        setShowTemplatePopup(true);
    };

    const confirmPayment = async () => {
        setShowTemplatePopup(false);
        setLoading(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success flow
        clearCart();
        localStorage.removeItem('checkout_details');
        alert('Payment Successful! Your authentic furniture is on the way.');
        navigate('/');
    };

    if (!details) return null;

    return (
        <div className="min-h-screen relative">
            {/* Template Popup */}
            {showTemplatePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full text-center">
                        <iconify-icon icon="lucide:alert-triangle" width="48" className="text-yellow-400 mb-4"></iconify-icon>
                        <h2 className="font-syne text-3xl font-bold mb-4 uppercase">Wait A Minute!</h2>
                        <p className="font-bold text-lg mb-2">THIS IS A TEMPLATE</p>
                        <p className="text-gray-600 mb-8">
                            No real money will be charged. This is a demonstration of the payment flow.
                            Do you want to proceed nicely?
                        </p>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={confirmPayment}
                                className="w-full py-3 bg-lime-400 text-black font-bold uppercase tracking-wider border-2 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Yes, Complete Order
                            </button>
                            <button
                                onClick={() => setShowTemplatePopup(false)}
                                className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider border-2 border-black hover:bg-gray-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Nav />
            <div className="bg-[#fafafa] min-h-screen py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-8 text-sm font-bold opacity-50">
                        <Link to="/cart" className="hover:underline">CART</Link>
                        <span>/</span>
                        <Link to="/checkout/details" className="hover:underline">DETAILS</Link>
                        <span>/</span>
                        <span className="opacity-100 text-black">PAYMENT</span>
                    </div>

                    <div className="flex flex-col gap-8">
                        {/* Order Confirmation */}
                        <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <h1 className="font-syne text-3xl font-bold mb-6 uppercase">Review & Pay</h1>

                            <div className="bg-gray-100 p-4 border-2 border-black mb-6 font-mono text-sm leading-relaxed">
                                <p className="font-bold mb-2">shipping to:</p>
                                <p>{details.fullName}</p>
                                <p>{details.address}</p>
                                <p>{details.city}, {details.zipCode}</p>
                                <p>{details.phone}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 border-2 border-black flex items-center gap-4 cursor-pointer hover:bg-yellow-100 transition-colors">
                                    <div className="w-6 h-6 rounded-full border-2 border-black bg-black flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <div className="flex-grow font-bold">Credit Card</div>
                                    <div className="flex gap-2 opacity-50">
                                        <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                        <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                    </div>
                                </div>

                                <div className="p-4 border-2 border-black flex items-center gap-4 cursor-pointer opacity-50">
                                    <div className="w-6 h-6 rounded-full border-2 border-black"></div>
                                    <div className="flex-grow font-bold">Crypto (Coming Soon)</div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t-2 border-black">
                                <form className="space-y-4 max-w-sm">
                                    <label className="font-bold text-sm">Card Details (Mock)</label>
                                    <input
                                        type="text"
                                        disabled
                                        placeholder="4242 4242 4242 4242"
                                        className="w-full p-3 border-2 border-black bg-gray-50 font-mono tracking-widest cursor-not-allowed"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            disabled
                                            placeholder="MM/YY"
                                            className="w-full p-3 border-2 border-black bg-gray-50 cursor-not-allowed"
                                        />
                                        <input
                                            type="text"
                                            disabled
                                            placeholder="CVC"
                                            className="w-full p-3 border-2 border-black bg-gray-50 cursor-not-allowed"
                                        />
                                    </div>
                                </form>
                            </div>

                            <button
                                onClick={handlePaymentClick}
                                disabled={loading}
                                className="w-full mt-8 py-5 bg-black text-white font-bold uppercase tracking-wider text-lg border-2 border-black hover:bg-lime-400 hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    'Processing'
                                ) : (
                                    <>
                                        Pay ${getCartTotal().toFixed(2)}
                                        <iconify-icon icon="lucide:lock" width="18"></iconify-icon>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPayment;
