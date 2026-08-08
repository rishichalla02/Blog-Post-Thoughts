import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import ConfirmModal from "./ConfirmModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <header className="border-b border-ink/10 dark:border-paper/10 bg-paper/80 dark:bg-ink/80 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-700 tracking-tight">
          Inkwell
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { to: "/", label: "Home" },
            ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
            ...(user ? [{ to: "/create", label: "Write" }] : []),
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="relative text-sm font-medium group"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={
                      isActive
                        ? "text-cobalt"
                        : "text-ink/70 dark:text-paper/70 group-hover:text-ink dark:group-hover:text-paper transition-colors duration-200"
                    }
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-cobalt transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <>
              <Link to="/edit-profile">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover hover:ring-2 hover:ring-cobalt/40 transition-all duration-200"
                />
              </Link>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="text-sm font-medium text-ink/70 dark:text-paper/70 hover:text-ink dark:hover:text-paper transition-colors duration-200"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-ink/70 dark:text-paper/70 hover:text-ink dark:hover:text-paper transition-colors duration-200"
              >
                Log in
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/register"
                  className="text-sm font-medium bg-cobalt text-paper px-4 py-2 rounded-md hover:bg-cobalt/90 transition-colors duration-200 inline-block"
                >
                  Sign up
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </nav>

      <ConfirmModal
        open={showLogoutConfirm}
        title="Log out of Inkwell?"
        message="You'll need to log in again to access your dashboard and write posts."
        confirmLabel="Log out"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </header>
  );
}
