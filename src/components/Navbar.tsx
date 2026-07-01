import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300 h-14 flex items-center"
      style={{
        backgroundColor: scrolled ? "rgba(7,11,20,0.92)" : "rgba(7,11,20,0.4)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
            style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-display font-semibold text-sm text-white tracking-tight">VibeCreator</span>
        </Link>

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
                className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
                style={{ color: "#94a3b8" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f0f4ff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
              >
                {label}
              </Link>
            ) : (
              <span
                key={label}
                className="px-3 py-1.5 text-sm font-medium rounded-md cursor-not-allowed select-none"
                style={{ color: "#2d3748" }}
              >
                {label}
              </span>
            )
          )}
          <a
            href="#pricing"
            className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
            style={{ color: "#94a3b8" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#f0f4ff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
          >
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden sm:inline-flex text-sm font-medium transition-colors"
            style={{ color: "#94a3b8" }}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => navigate("/discover")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-1.5 rounded-lg transition-all"
            style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
              boxShadow: "0 0 20px rgba(59,130,246,0.25)",
            }}
          >
            Start Discovering
          </button>
        </div>
      </div>
    </header>
  );
}
