import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import AnimatedPage from "../components/AnimatedPage";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="max-w-md mx-auto px-6 py-20">
        <h1 className="font-display text-3xl font-700 mb-2">
          Create an account
        </h1>
        <p className="text-ink/60 mb-8">Join Inkwell and start publishing.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-ink/15 bg-white focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-ink/15 bg-white focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-ink/15 bg-white focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-ink/15 bg-white focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-cobalt text-paper py-2.5 rounded-md font-medium hover:bg-cobalt/90 disabled:opacity-60 transition-colors duration-200"
          >
            {loading ? "Creating account..." : "Sign up"}
          </motion.button>
        </form>

        <p className="text-sm text-ink/60 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cobalt font-medium">
            Log in
          </Link>
        </p>
      </div>
    </AnimatedPage>
  );
}
