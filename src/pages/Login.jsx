import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      Swal.fire("Success!", "Logged in successfully", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      Swal.fire("Success!", "Logged in with Google", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message || "Google login failed", "error");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-base-content mb-8 text-center">
          Welcome Back
        </h1>
        <div className="bg-base-100 border border-base-300 rounded-2xl w-full p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
              required
            />

            <label className="label mt-4">
              <span className="label-text font-semibold text-base-content">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-6"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="btn bg-base-100 text-base-content border-base-300 w-full hover:bg-base-200"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="currentColor"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            {googleLoading ? "Logging in..." : "Login with Google"}
          </button>

          <p className="text-center text-base-content/70 mt-6 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
