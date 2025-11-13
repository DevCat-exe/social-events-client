import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-white">
                CommunityEvents
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Building stronger communities through social development events
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-green-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/upcoming"
                  className="hover:text-green-400 transition"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-green-400 transition">
                  Create Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-400 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-400 transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-sm text-gray-400">
          <div className="flex justify-between items-center">
            <p>&copy; 2024 CommunityEvents. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-green-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-400 transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
