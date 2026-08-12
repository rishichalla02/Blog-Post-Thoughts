import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import AnimatedPage from "../components/AnimatedPage";
import SEO from "../components/SEO";
import toast from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <SEO title="Log in" />
      <div className="max-w-md mx-auto px-6 py-20">
        <h1 className="font-display text-3xl font-700 mb-2">Welcome back</h1>
        <p className="text-ink/60 mb-8">Log in to continue writing.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink/40 text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <PasswordInput
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink/40 text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
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
            className="w-full bg-cobalt dark:bg-mustard text-paper dark:text-ink px-6 py-2.5 rounded-md font-medium hover:bg-cobalt/90 dark:hover:bg-mustard/90 disabled:opacity-60 transition-colors duration-200"
          >
            {loading ? "Logging in..." : "Log in"}
          </motion.button>
        </form>

        <p className="text-md text-ink/60 dark:text-paper/60 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-cobalt font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </AnimatedPage>
  );
}
