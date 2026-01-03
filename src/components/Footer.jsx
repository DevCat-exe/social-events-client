import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-300 pt-20 pb-10 text-base-content border-t border-base-content/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content font-bold text-lg">
                S
              </div>
              <span className="text-xl font-bold tracking-tight">
                SocialEvents
              </span>
            </Link>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Empowering communities through meaningful connections and
              impactful social development events. Join our mission today.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/socialevents"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-base-100 rounded-lg hover:bg-primary hover:text-primary-content transition shadow-sm border border-base-content/5"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com/socialevents"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-base-100 rounded-lg hover:bg-primary hover:text-primary-content transition shadow-sm border border-base-content/5"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com/socialevents"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-base-100 rounded-lg hover:bg-primary hover:text-primary-content transition shadow-sm border border-base-content/5"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              Platform
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/upcoming"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  Explore Events
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  Our Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  to="/contact"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  Help Center
                </a>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-base-content/70 hover:text-primary transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full"></span>
              Join Us
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-base-100 rounded-2xl border border-base-content/5 shadow-sm space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-base-content/40">
                  Ready to help?
                </p>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm w-full rounded-xl"
                >
                  Get Started
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm text-base-content/70">
                <div className="p-2 bg-base-100 rounded-lg">
                  <Mail size={16} />
                </div>
                <span>hello@socialevents.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-base-content/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-base-content/40 uppercase tracking-widest">
          <p>&copy; {currentYear} SocialEvents. Built for Impact.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition">
              Sitemap
            </a>
            <a href="#" className="hover:text-primary transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
