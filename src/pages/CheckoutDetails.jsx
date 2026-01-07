import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const CheckoutDetails = () => {
    const { getCartTotal } = useCart();
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        phone: ''
    });

    useEffect(() => {
        // Simple auth check
        const token = localStorage.getItem('auth_token');
        if (!token) {
            // Redirect to login if not authenticated, passing the current location as state/query
            // for redirection back after login (would need to update Auth logic for that)
            // For now, simple redirect
            navigate('/login?redirect=/checkout/details');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically validate and save details
        // For this demo, we'll pass them in state or just specificy proceed
        localStorage.setItem('checkout_details', JSON.stringify(details));
        navigate('/checkout/payment');
    };

    return (
        <div className="min-h-screen">
            <Nav />
            <div className="bg-[#fafafa] min-h-screen py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-8 text-sm font-bold opacity-50">
                        <Link to="/cart" className="hover:underline">CART</Link>
                        <span>/</span>
                        <span className="opacity-100 text-black">DETAILS</span>
                        <span>/</span>
                        <span>PAYMENT</span>
                    </div>

                    <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h1 className="font-syne text-3xl font-bold mb-8 uppercase">Shipping Details</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="font-bold text-sm uppercase">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={details.fullName}
                                        onChange={handleChange}
                                        className="w-full p-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all font-mono"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-sm uppercase">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={details.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all font-mono"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-bold text-sm uppercase">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={details.address}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all font-mono"
                                    placeholder="123 Skibidi St."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="font-bold text-sm uppercase">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={details.city}
                                        onChange={handleChange}
                                        className="w-full p-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all font-mono"
                                        placeholder="Ohio City"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-sm uppercase">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        required
                                        value={details.zipCode}
                                        onChange={handleChange}
                                        className="w-full p-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all font-mono"
                                        placeholder="42069"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-bold text-sm uppercase">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={details.phone}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all font-mono"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>

                            <div className="pt-6 border-t-2 border-black flex justify-between items-center">
                                <div className="font-bold">
                                    <span className="text-gray-500 block text-xs uppercase">Total to Pay</span>
                                    <span className="text-2xl">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-lime-400 text-black font-bold uppercase tracking-wider border-2 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    Review & Pay
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutDetails;
