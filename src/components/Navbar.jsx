import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-ink/10 bg-paper/80 backdrop-blur-md sticky top-0 z-40">
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
                        ? "text-cobalt"
                        : "text-ink/70 group-hover:text-ink transition-colors duration-200"
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

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <button
                onClick={logout}
                className="text-sm font-medium text-ink/70 hover:text-ink transition-colors duration-200"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-ink/70 hover:text-ink transition-colors duration-200"
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
    </header>
  );
}
