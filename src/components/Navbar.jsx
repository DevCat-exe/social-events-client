import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  Calendar,
  Settings,
  Users,
  Menu,
  X,
  ChevronDown,
  User,
  Heart,
  LayoutDashboard,
} from "lucide-react";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { useTheme } from "../providers/ThemeProvider";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const photoURL = user?.photoURL;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setShowDropdown(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/upcoming" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav className="bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-content/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-content font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition">
              S
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary hidden sm:block">
              SocialEvents
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-all hover:text-primary ${location.pathname === link.path
                  ? "text-primary"
                  : "text-base-content/70"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm text-base-content">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={isDark}
              />
              <svg
                className="swap-off h-5 w-5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg className="swap-on h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 p-1 pl-3 rounded-full bg-base-300/30 hover:bg-base-300/50 transition border border-base-content/5"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold leading-none">
                      {displayName}
                    </p>
                    <p className="text-[10px] text-base-content/60 leading-tight">
                      Member
                    </p>
                  </div>
                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt={displayName}
                      className="w-9 h-9 rounded-full object-cover border-2 border-primary shadow-sm"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-linear-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-base-content/50 transition-transform ${showDropdown ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-3 w-64 bg-base-100 rounded-2xl shadow-2xl border border-base-content/5 py-3 overflow-hidden"
                    >
                      <div className="px-5 py-3 border-b border-base-content/5 mb-2">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                          Account
                        </p>
                        <p className="text-sm font-bold truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="space-y-1 px-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition group"
                          onClick={() => setShowDropdown(false)}
                        >
                          <div className="p-2 bg-base-300/50 rounded-lg group-hover:bg-primary/20">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">
                            My Profile
                          </span>
                        </Link>
                        <Link
                          to="/manage"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition group"
                          onClick={() => setShowDropdown(false)}
                        >
                          <div className="p-2 bg-base-300/50 rounded-lg group-hover:bg-primary/20">
                            <Settings className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">
                            Manage Events
                          </span>
                        </Link>
                        <Link
                          to="/joined"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition group"
                          onClick={() => setShowDropdown(false)}
                        >
                          <div className="p-2 bg-base-300/50 rounded-lg group-hover:bg-primary/20">
                            <Heart className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">
                            Joined Events
                          </span>
                        </Link>
                        <Link
                          to="/create"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition group"
                          onClick={() => setShowDropdown(false)}
                        >
                          <div className="p-2 bg-base-300/50 rounded-lg group-hover:bg-primary/20">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">
                            Create Event
                          </span>
                        </Link>
                      </div>

                      <div className="mt-3 pt-3 border-t border-base-content/5 px-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-error/10 text-error transition group"
                        >
                          <div className="p-2 bg-error/5 rounded-lg group-hover:bg-error/20">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className="btn btn-ghost btn-sm text-sm font-bold tracking-wide"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm px-6 rounded-full text-sm font-bold shadow-lg shadow-primary/20"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-ghost btn-circle btn-sm lg:hidden text-base-content"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-base-100 border-b border-base-content/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl font-semibold transition ${location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/70"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <div className="flex flex-col gap-2 pt-4 border-t border-base-content/5">
                  <Link to="/login" className="btn btn-ghost w-full">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary w-full shadow-lg shadow-primary/20"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
