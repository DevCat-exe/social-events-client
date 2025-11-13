import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { Check, X } from "lucide-react";
import Swal from "sweetalert2";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const passwordRequirements = {
    length: form.password.length >= 6,
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
  };

  const isPasswordValid = Object.values(passwordRequirements).every((v) => v);
  const passwordsMatch =
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password, confirmPassword } = form;

    if (!isPasswordValid) {
      Swal.fire(
        "Error",
        "Password must have uppercase, lowercase, and be 6+ characters",
        "error"
      );
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, name, photoURL || null);
      Swal.fire("Success!", "Registration successful", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-base-content mb-8 text-center">
          Join Us
        </h1>
        <div className="bg-base-100 border border-base-300 rounded-2xl w-full p-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                Full Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
              required
            />

            <label className="label mt-4">
              <span className="label-text font-semibold text-base-content">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
              required
            />

            <label className="label mt-4">
              <span className="label-text font-semibold text-base-content">
                Photo URL (optional)
              </span>
            </label>
            <input
              type="url"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              value={form.photoURL}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
            />

            <label className="label mt-4">
              <span className="label-text font-semibold text-base-content">
                Password
              </span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
              required
            />

            {form.password && (
              <div className="text-sm space-y-1 p-3 bg-base-200 rounded-lg mt-2">
                <div
                  className={`flex items-center gap-2 ${
                    passwordRequirements.length
                      ? "text-success"
                      : "text-base-content/70"
                  }`}
                >
                  {passwordRequirements.length ? (
                    <Check size={16} />
                  ) : (
                    <X size={16} />
                  )}
                  <span>At least 6 characters</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    passwordRequirements.uppercase
                      ? "text-success"
                      : "text-base-content/70"
                  }`}
                >
                  {passwordRequirements.uppercase ? (
                    <Check size={16} />
                  ) : (
                    <X size={16} />
                  )}
                  <span>One uppercase letter (A-Z)</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    passwordRequirements.lowercase
                      ? "text-success"
                      : "text-base-content/70"
                  }`}
                >
                  {passwordRequirements.lowercase ? (
                    <Check size={16} />
                  ) : (
                    <X size={16} />
                  )}
                  <span>One lowercase letter (a-z)</span>
                </div>
              </div>
            )}

            <label className="label mt-4">
              <span className="label-text font-semibold text-base-content">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100 text-base-content border-base-300"
              required
            />
            {form.confirmPassword && (
              <p
                className={`text-sm mt-2 font-semibold ${
                  passwordsMatch ? "text-success" : "text-error"
                }`}
              >
                {passwordsMatch
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-8"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-base-content/70 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
