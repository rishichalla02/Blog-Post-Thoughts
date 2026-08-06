import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-cobalt" : "text-ink/70 hover:text-ink"
    }`;

  return (
    <header className="border-b border-ink/10 bg-paper sticky top-0 z-40">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-700 tracking-tight">
          RC-Blog
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}
          {user && (
            <NavLink to="/create" className={linkClass}>
              Write
            </NavLink>
          )}
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
                className="text-sm font-medium text-ink/70 hover:text-ink"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-ink/70 hover:text-ink"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-cobalt text-paper px-4 py-2 rounded-md hover:bg-cobalt/90"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
