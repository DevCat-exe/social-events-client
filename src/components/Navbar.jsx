import { Link, useNavigate } from "react-router-dom";
import { LogOut, Calendar, Settings, Users } from "lucide-react";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "socialevents-dark";
  });
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
    const theme = isDark ? "socialevents-dark" : "socialevents";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setShowDropdown(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold text-base-content">
              Social Events
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/upcoming"
              className="text-base-content hover:text-primary font-medium transition"
            >
              Upcoming Events
            </Link>

            <label className="swap swap-rotate cursor-pointer text-base-content">
              <input
                type="checkbox"
                className="theme-controller"
                value="socialevents-dark"
                checked={isDark}
                onChange={(e) => setIsDark(e.target.checked)}
              />
              <svg
                className="swap-off h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-on h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 hover:opacity-80 transition"
                  title={displayName}
                >
                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt={displayName}
                      className="w-10 h-10 rounded-full border-2 border-green-500 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-green-500 bg-green-600 flex items-center justify-center text-white font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-lg shadow-xl border border-base-200 py-2">
                    <div className="px-4 py-3 border-b border-base-200">
                      <p className="text-sm font-semibold text-base-content">
                        {displayName}
                      </p>
                      <p className="text-xs text-base-content/70">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/create"
                      className="flex items-center gap-3 px-4 py-2 text-base-content hover:bg-base-200 hover:text-primary transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Calendar className="w-4 h-4" />
                      Create Event
                    </Link>

                    <Link
                      to="/manage"
                      className="flex items-center gap-3 px-4 py-2 text-base-content hover:bg-base-200 hover:text-primary transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Manage Events
                    </Link>

                    <Link
                      to="/joined"
                      className="flex items-center gap-3 px-4 py-2 text-base-content hover:bg-base-200 hover:text-primary transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Users className="w-4 h-4" />
                      Joined Events
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-error hover:bg-base-200 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
