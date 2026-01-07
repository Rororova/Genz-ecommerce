import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import Marquee from '../components/Marquee'

const About = () => {
    return (
        <div className="min-h-screen">
            <Marquee text="WATCH IN STYLE • PREMIUM SEATING • LEVEL 100 COMFORT • OHIO'S FINEST • CERTIFIED AUTHENTIC" />
            <Nav />

            {/* Hero Section */}
            <section className="bg-yellow-400 border-b-2 border-black py-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="font-syne text-5xl md:text-7xl font-bold text-center tracking-tighter mb-8 leading-[0.9]">
                        ABOUT <span className="bg-white px-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">COOL.</span>
                    </h1>
                    <p className="text-center text-xl font-medium max-w-2xl mx-auto">
                        We're not just selling chairs. We're selling a lifestyle. A vibe. A whole aesthetic for the modern observer.
                    </p>
                </div>
            </section>

            {/* The Story */}
            <section className="bg-white py-20 px-6 border-b-2 border-black">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="bg-pink-500 text-white px-3 py-1 text-xs font-bold uppercase mb-4 inline-block border-2 border-black">
                                Origin Story
                            </span>
                            <h2 className="font-syne text-4xl font-bold tracking-tighter mb-6">
                                Born in Ohio, Raised by Memes
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                It all started in a basement in Ohio (naturally). Our founder was tired of standing while watching life happen. Why be the main character when you can be the audience?
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                We realized the world needed premium seating for premium watching. Not gaming chairs. Not office chairs. <strong>Watching chairs.</strong>
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Fast forward to today: COOL. is the go-to brand for people who understand that sometimes the best seat in the house is the one in the corner.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop"
                                    alt="Modern chair in minimalist setting"
                                    className="w-full h-96 object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-lime-400 border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-sm rotate-3">
                                EST. 2024
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="bg-[#fafafa] py-20 px-6 border-b-2 border-black">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-syne text-4xl font-bold text-center tracking-tighter mb-12 uppercase">
                        The Mission
                    </h2>

                    <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                        <div className="absolute -top-4 left-8 bg-yellow-400 border-2 border-black px-4 py-1 font-bold text-sm">
                            OUR WHY
                        </div>
                        <p className="text-2xl md:text-3xl font-syne font-bold leading-relaxed text-center">
                            "To provide premium seating solutions for the modern observer.
                            <span className="bg-yellow-400 px-2 mx-1">Because watching</span>
                            is an art form, and you deserve to do it in style."
                        </p>
                    </div>
                </div>
            </section>

            {/* The Values */}
            <section className="bg-white py-20 px-6 border-b-2 border-black">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-syne text-4xl font-bold text-center tracking-tighter mb-16 uppercase">
                        What We Stand For
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="border-2 border-black p-6 bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-rotate-2 transition-transform">
                            <div className="w-12 h-12 bg-black text-yellow-400 flex items-center justify-center mb-4 border-2 border-black">
                                <iconify-icon icon="lucide:smile" width="24"></iconify-icon>
                            </div>
                            <h3 className="font-bold text-xl mb-2">Authenticity</h3>
                            <p className="text-sm">We keep it 100. No cap, fr fr.</p>
                        </div>

                        <div className="border-2 border-black p-6 bg-lime-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:rotate-2 transition-transform">
                            <div className="w-12 h-12 bg-black text-lime-400 flex items-center justify-center mb-4 border-2 border-black">
                                <iconify-icon icon="lucide:zap" width="24"></iconify-icon>
                            </div>
                            <h3 className="font-bold text-xl mb-2">Quality</h3>
                            <p className="text-sm">Built different. Hits different.</p>
                        </div>

                        <div className="border-2 border-black p-6 bg-pink-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-rotate-2 transition-transform">
                            <div className="w-12 h-12 bg-white text-pink-500 flex items-center justify-center mb-4 border-2 border-black">
                                <iconify-icon icon="lucide:heart" width="24"></iconify-icon>
                            </div>
                            <h3 className="font-bold text-xl mb-2">Community</h3>
                            <p className="text-sm">We're all in this together, fam.</p>
                        </div>

                        <div className="border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:rotate-2 transition-transform">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4 border-2 border-black">
                                <iconify-icon icon="lucide:sparkles" width="24"></iconify-icon>
                            </div>
                            <h3 className="font-bold text-xl mb-2">Innovation</h3>
                            <p className="text-sm">Always pushing boundaries.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-[#fafafa] py-20 px-6 border-b-2 border-black">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-syne text-4xl font-bold text-center tracking-tighter mb-4 uppercase">
                        The Team
                    </h2>
                    <p className="text-center text-gray-600 mb-12">The minds behind the chairs</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                            <div className="h-64 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center border-b-2 border-black">
                                <div className="w-32 h-32 bg-white border-2 border-black rounded-full flex items-center justify-center">
                                    <iconify-icon icon="lucide:user" width="48"></iconify-icon>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-1">Chad McSigma</h3>
                                <p className="text-sm text-gray-500 mb-3 font-mono">Founder & CEO</p>
                                <p className="text-sm text-gray-700">The OG. Turned basement dreams into chair reality.</p>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                            <div className="h-64 bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center border-b-2 border-black">
                                <div className="w-32 h-32 bg-white border-2 border-black rounded-full flex items-center justify-center">
                                    <iconify-icon icon="lucide:palette" width="48"></iconify-icon>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-1">Bella Rizzmann</h3>
                                <p className="text-sm text-gray-500 mb-3 font-mono">Head of Design</p>
                                <p className="text-sm text-gray-700">Makes sure every chair has main character energy.</p>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                            <div className="h-64 bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center border-b-2 border-black">
                                <div className="w-32 h-32 bg-white border-2 border-black rounded-full flex items-center justify-center">
                                    <iconify-icon icon="lucide:wrench" width="48"></iconify-icon>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-1">Kyle Gyattson</h3>
                                <p className="text-sm text-gray-500 mb-3 font-mono">Chief Engineer</p>
                                <p className="text-sm text-gray-700">Builds chairs that hit different, engineered for vibes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-black text-white py-16 px-6 border-b-2 border-black">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="font-syne text-5xl md:text-6xl font-bold mb-2 text-yellow-400">10K+</div>
                            <div className="text-sm uppercase tracking-wider font-medium text-gray-400">Happy Watchers</div>
                        </div>
                        <div className="text-center">
                            <div className="font-syne text-5xl md:text-6xl font-bold mb-2 text-lime-400">50+</div>
                            <div className="text-sm uppercase tracking-wider font-medium text-gray-400">Chair Models</div>
                        </div>
                        <div className="text-center">
                            <div className="font-syne text-5xl md:text-6xl font-bold mb-2 text-pink-400">100%</div>
                            <div className="text-sm uppercase tracking-wider font-medium text-gray-400">Ohio Approved</div>
                        </div>
                        <div className="text-center">
                            <div className="font-syne text-5xl md:text-6xl font-bold mb-2 text-white">∞</div>
                            <div className="text-sm uppercase tracking-wider font-medium text-gray-400">Vibes Created</div>
                        </div>
                    </div>
                </div>
            </section>

            <Newsletter />
            <Footer />
        </div>
    )
}

export default About
