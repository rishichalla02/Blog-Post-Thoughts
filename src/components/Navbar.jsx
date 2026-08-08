import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import ConfirmModal from "./ConfirmModal";
import Tooltip from "./Tooltip";

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
          RC-Blog
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
                        ? "text-cobalt dark:text-mustard"
                        : "text-ink/70 dark:text-paper/70 group-hover:text-cobalt dark:group-hover:text-mustard transition-colors duration-200"
                    }
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-cobalt dark:bg-mustard transition-all duration-300 ${
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
              <Tooltip text="Edit profile">
                <Link to="/edit-profile">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent hover:ring-cobalt/50 dark:hover:ring-mustard/50 transition-all duration-200 cursor-pointer"
                  />
                </Link>
              </Tooltip>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="text-sm font-medium text-ink/70 dark:text-paper/70 hover:text-cobalt dark:hover:text-mustard px-2 py-1 rounded-md hover:bg-ink/5 dark:hover:bg-paper/10 transition-colors duration-200"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-ink/70 dark:text-paper/70 hover:text-cobalt dark:hover:text-mustard px-2 py-1 rounded-md hover:bg-ink/5 dark:hover:bg-paper/10 transition-colors duration-200"
              >
                Log in
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/register"
                  className="text-sm font-medium bg-cobalt dark:bg-mustard text-paper dark:text-ink px-4 py-2 rounded-md hover:bg-cobalt/90 dark:hover:bg-mustard/90 transition-colors duration-200 inline-block"
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
        title="Log out of RC-Blog?"
        message="You'll need to log in again to access your dashboard and write posts."
        confirmLabel="Log out"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </header>
  );
}
