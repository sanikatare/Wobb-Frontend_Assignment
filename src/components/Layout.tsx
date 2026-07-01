import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#070b14", color: "#f0f4ff" }}>
      {/* Top nav */}
      <header
        className="sticky top-0 z-40 w-full"
        style={{
          backgroundColor: "rgba(7,11,20,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                style={{ background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-display font-semibold text-sm tracking-tight text-white">
                VibeCreator
              </span>
            </Link>

            {/* Nav tabs */}
            <nav className="hidden md:flex items-center gap-0.5">
              <Link
                to="/discover"
                className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
                style={{
                  color: location.pathname === "/discover" ? "#f0f4ff" : "#64748b",
                  backgroundColor: location.pathname === "/discover" ? "rgba(255,255,255,0.07)" : "transparent",
                }}
              >
                Discover
              </Link>
              {["Campaigns", "Lists", "Analytics"].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 text-sm font-medium rounded-md cursor-not-allowed select-none"
                  style={{ color: "#2d3748" }}
                >
                  {item}
                </span>
              ))}
            </nav>
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-200">Alex Carter</span>
              <span className="text-[10px]" style={{ color: "#64748b" }}>Marketing Lead</span>
            </div>
            <div
              className="w-8 h-8 rounded-full overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <div className="mb-6">
            <h1 className="text-xl font-semibold tracking-tight text-white font-display">{title}</h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
