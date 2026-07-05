import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS: { label: string; to: string | null }[] = [
  { label: "Discover", to: "/discover" },
  { label: "Campaigns", to: null },
  { label: "Analytics", to: null },
];

/**
 * Shared app header used on every page (landing + in-app).
 * On the landing page it starts transparent and turns solid on scroll;
 * on every other page it is always solid + sticky, and swaps the
 * marketing CTA for the signed-in user block.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    if (!isLanding) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLanding]);

  // Close the mobile panel on route change (adjusted during render, per
  // React's recommended pattern, instead of setState-in-effect).
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  const solidHeader = !isLanding || scrolled;
  const goToDiscover = () => navigate("/discover");

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2";

  return (
    <header
      className={`${isLanding ? "fixed" : "sticky"} top-0 inset-x-0 z-50 transition-colors duration-300 ${
        solidHeader
          ? "bg-white/95 backdrop-blur-md border-b border-[#E8EAED]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className={`flex items-center gap-2 rounded-md ${focusRing}`}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0" style={{ background: "linear-gradient(135deg, #1A73E8 0%, #8B5CF6 100%)" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-display font-semibold text-[15px] tracking-tight text-[#202124]">
            VibeCreator
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, to }) =>
            to ? (
              <Link
                key={label}
                to={to}
                className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${focusRing} ${
                  location.pathname === to
                    ? "bg-[#E8F0FE] text-[#1A73E8]"
                    : "text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]"
                }`}
              >
                {label}
              </Link>
            ) : (
              <span
                key={label}
                aria-disabled="true"
                title="Coming soon"
                className="px-3.5 py-2 text-sm font-medium rounded-full text-[#BDC1C6] cursor-not-allowed select-none"
              >
                {label}
              </span>
            )
          )}
          <a
            href="#pricing"
            className={`px-3.5 py-2 text-sm font-medium rounded-full text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124] transition-colors ${focusRing}`}
          >
            Pricing
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {isLanding ? (
            <>
              <button
                type="button"
                className={`hidden sm:inline-flex text-sm font-medium text-[#5F6368] hover:text-[#202124] transition-colors rounded-md px-2 py-1 ${focusRing}`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={goToDiscover}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold text-white px-5 py-2.5 rounded-full bg-[#1A73E8] hover:bg-[#1967D2] shadow-sm hover:shadow-md transition-all ${focusRing}`}
              >
                Start Discovering
              </button>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2.5 pr-1">
              <div className="flex flex-col text-right leading-tight">
                <span className="text-xs font-semibold text-[#202124]">Alex Carter</span>
                <span className="text-[11px] text-[#5F6368]">Marketing Lead</span>
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E8EAED] shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Alex Carter"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-[#5F6368] hover:bg-[#F1F3F4] transition-colors ${focusRing}`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav-panel"
        className={`md:hidden overflow-hidden bg-white border-b border-[#E8EAED] transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, to }) =>
            to ? (
              <Link
                key={label}
                to={to}
                className={`px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors ${focusRing} ${
                  location.pathname === to
                    ? "bg-[#E8F0FE] text-[#1A73E8]"
                    : "text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]"
                }`}
              >
                {label}
              </Link>
            ) : (
              <span
                key={label}
                aria-disabled="true"
                className="px-3.5 py-2.5 text-sm font-medium rounded-lg text-[#BDC1C6] cursor-not-allowed select-none"
              >
                {label}
              </span>
            )
          )}
          <a
            href="#pricing"
            className={`px-3.5 py-2.5 text-sm font-medium rounded-lg text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124] transition-colors ${focusRing}`}
          >
            Pricing
          </a>
          {isLanding && (
            <button
              type="button"
              onClick={goToDiscover}
              className={`mt-2 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white px-5 py-2.5 rounded-full bg-[#1A73E8] hover:bg-[#1967D2] shadow-sm transition-all ${focusRing}`}
            >
              Start Discovering
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
