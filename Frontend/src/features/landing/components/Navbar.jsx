import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="w-full border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand */}
        <div className="brandLogo">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Interview<span className="text-indigo-600">AI</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navLinks hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            How It Works
          </a>
        </div>

        {/* Desktop Auth Actions */}
        <div className="authActions hidden items-center gap-3 md:flex">
          {user ? (
            <Link
              to="/home"
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-xs transition-all hover:bg-indigo-700"
            >
              Go to Workspace →
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-xs transition-all hover:bg-indigo-700 hover:shadow-xs"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-5">
            {/* Mobile Navigation Links */}
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              How It Works
            </a>

            {/* Mobile Auth Actions */}
            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-4">
              {user ? (
                <Link
                  to="/home"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-xs transition-all hover:bg-indigo-700"
                >
                  Go to Workspace →
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-xs transition-all hover:bg-indigo-700"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;