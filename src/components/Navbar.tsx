import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 h-14 flex items-center backdrop-blur-md ${
        scrolled
          ? "bg-slate-950/92 border-b border-slate-700/50"
          : "bg-slate-950/40 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white bg-gradient-to-r from-blue-700 to-blue-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="font-display font-semibold text-sm text-white tracking-tight">
            VibeCreator
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-0.5">
          {[
            { label: "Discover", to: "/discover" },
            { label: "Campaigns", to: null },
            { label: "Analytics", to: null },
          ].map(({ label, to }) =>
            to ? (
              <Link
                key={label}
                to={to}
                className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-400 hover:text-slate-100 transition-colors duration-200"
              >
                {label}
              </Link>
            ) : (
              <span
                key={label}
                className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-600 cursor-not-allowed select-none"
              >
                {label}
              </span>
            )
          )}
          <a
            href="#pricing"
            className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-400 hover:text-slate-100 transition-colors duration-200"
          >
            Pricing
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden sm:inline-flex text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors duration-200"
          >
            Sign in
          </button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate("/discover")}
            className="shadow-lg shadow-blue-500/20"
          >
            Start Discovering
          </Button>
        </div>
      </div>
    </header>
  );
}
