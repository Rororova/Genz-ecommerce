import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Architect Your Perfect Seating
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover our curated collection of designer chairs that blend form, function, and timeless elegance. Each piece is crafted to elevate your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#chairs"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                Shop Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg"
                alt="Designer chair showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gray-900 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-10 w-72 h-72 bg-gray-200 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-300 rounded-full blur-3xl opacity-20 -z-10"></div>
    </section>
  );
}
