import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: 'about' | 'design' | 'sustainability') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Cuck Chair Architect</h3>
            <p className="text-gray-400">
              Crafting exceptional seating experiences since 2025.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">About Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate?.('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('design')}
                  className="hover:text-white transition-colors text-left"
                >
                  Design Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('sustainability')}
                  className="hover:text-white transition-colors text-left"
                >
                  Sustainability
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>hello@cuckchair.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>123 Design Street, NY</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Cuck Chair Architect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
