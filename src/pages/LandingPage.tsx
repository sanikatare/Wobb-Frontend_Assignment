import { useNavigate } from "react-router-dom";
import { Sparkles, Search, TrendingUp, Users, Target, ArrowRight, Camera, PlaySquare, Music2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GlobeCanvas } from "@/components/GlobeCanvas";
import { FloatingAnalyticsCard } from "@/components/FloatingAnalyticsCard";

const BRANDS = ["Nike", "Sephora", "Gymshark", "Samsung", "Figma", "Notion", "Spotify", "Adobe"];

const PLATFORM_CHIPS = [
  { icon: Camera, label: "Instagram" },
  { icon: PlaySquare, label: "YouTube" },
  { icon: Music2, label: "TikTok" },
];

const FEATURES = [
  {
    icon: Search,
    title: "Unified creator search",
    body: "Query Instagram, YouTube, and TikTok in one bar — merged into a single ranked list.",
  },
  {
    icon: Target,
    title: "AI audience matching",
    body: "Describe your target audience in plain language and rank creators by true fit, not vanity metrics.",
  },
  {
    icon: TrendingUp,
    title: "Real engagement signals",
    body: "Every profile is scored on engagement rate and audience quality before it reaches your shortlist.",
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const goToDiscover = () => navigate("/discover");

  return (
    <div className="vc-landing min-h-screen text-slate-100 overflow-x-clip">
      <Navbar />

      {/* Aurora glows — blue palette */}
      <div className="vc-aurora w-[500px] h-[500px] -top-40 -left-32" style={{ backgroundColor: "rgba(29,78,216,0.18)" }} />
      <div className="vc-aurora w-[400px] h-[400px] top-60 -right-24" style={{ backgroundColor: "rgba(59,130,246,0.12)" }} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{ border: "1px solid rgba(59,130,246,0.3)", backgroundColor: "rgba(59,130,246,0.08)", color: "#60a5fa" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI-powered creator discovery
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-[1.06] tracking-tight text-white">
              Find the creators your
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #93c5fd 50%, #38bdf8 100%)" }}
              >
                audience already trusts.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed max-w-lg" style={{ color: "#64748b" }}>
              VibeCreator scans millions of profiles across Instagram, YouTube, and TikTok
              and surfaces the creators whose audience genuinely matches your brand —
              ranked by real engagement, not follower count.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={goToDiscover}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-lg transition-all"
                style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", boxShadow: "0 0 24px rgba(59,130,246,0.30)" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 32px rgba(59,130,246,0.45)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 24px rgba(59,130,246,0.30)")}
              >
                Start Discovering
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                style={{ color: "#64748b", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#f0f4ff"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.14)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#64748b"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                How it works
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm" style={{ color: "#4b5563" }}>
              <div><span className="text-white font-display font-semibold text-xl">12M+</span> profiles</div>
              <div className="w-px h-6" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
              <div><span className="text-white font-display font-semibold text-xl">3</span> platforms</div>
              <div className="w-px h-6" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
              <div><span className="text-white font-display font-semibold text-xl">AI</span> matching</div>
            </div>
          </div>

          {/* Right: Globe */}
          <div className="relative h-[400px] sm:h-[460px] lg:h-[520px]">
            <div className="absolute inset-0">
              <GlobeCanvas />
            </div>
            <FloatingAnalyticsCard icon={Users} label="Audience match" value="94%" trend="+12%" accent="blue" className="top-6 left-0 sm:-left-4" speed="slow" delay="0s" />
            <FloatingAnalyticsCard icon={TrendingUp} label="Engagement rate" value="6.8%" trend="↑ strong" accent="cyan" className="bottom-10 right-0 sm:-right-2" speed="slower" delay="1.2s" />
            <FloatingAnalyticsCard icon={Sparkles} label="Creators matched" value="1,204" accent="blue" className="bottom-0 left-4 sm:left-8" speed="slow" delay="2.4s" />
          </div>
        </div>
      </section>

      {/* ── Trusted by ─────────────────────────────────────────────── */}
      <section className="relative py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-center text-[10px] font-semibold tracking-widest uppercase mb-7" style={{ color: "#4b5563" }}>
          Trusted by marketing teams at
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10" style={{ background: "linear-gradient(to right, #070b14, transparent)" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10" style={{ background: "linear-gradient(to left, #070b14, transparent)" }} />
          <div className="flex w-max animate-marquee">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span
                key={`${brand}-${i}`}
                className="mx-8 text-xl font-display font-semibold whitespace-nowrap transition-colors"
                style={{ color: "#1e293b" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#475569")}
                onMouseLeave={e => (e.currentTarget.style.color = "#1e293b")}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Search preview ─────────────────────────────────────────── */}
      <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight">One bar. Every platform.</h2>
          <p className="mt-4 max-w-md mx-auto text-sm" style={{ color: "#4b5563" }}>
            Type what you're looking for — VibeCreator ranks creators across all platforms instantly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <button
            type="button"
            onClick={goToDiscover}
            className="group w-full text-left rounded-xl p-3 transition-all"
            style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3 flex-1 px-3 py-2.5 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                <Search className="w-4 h-4 shrink-0" style={{ color: "#4b5563" }} />
                <span className="text-sm truncate" style={{ color: "#4b5563" }}>Fitness micro-influencers, 50K–200K followers, US audience...</span>
              </div>
              <span
                className="inline-flex items-center justify-center gap-2 shrink-0 text-xs font-semibold text-white px-4 py-2.5 rounded-lg transition-all"
                style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", boxShadow: "0 0 20px rgba(59,130,246,0.25)" }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Search
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3 px-1">
              {PLATFORM_CHIPS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#64748b" }}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </span>
              ))}
            </div>
          </button>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl p-5 transition-colors"
              style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.22)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(59,130,246,0.10)", color: "#60a5fa" }}
              >
                <Icon className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-display text-sm font-semibold text-white mb-2">{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#4b5563" }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="vc-aurora w-[380px] h-[380px] -bottom-32 left-1/2 -translate-x-1/2" style={{ backgroundColor: "rgba(29,78,216,0.12)" }} />
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight max-w-xl mx-auto">
          Your next creator partnership is already in the network.
        </h2>
        <button
          type="button"
          onClick={goToDiscover}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-lg transition-all"
          style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", boxShadow: "0 0 28px rgba(59,130,246,0.28)" }}
        >
          Start Discovering
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="mt-20 pt-6 text-[11px]" style={{ color: "#1e293b", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          © {new Date().getFullYear()} VibeCreator. All rights reserved.
        </p>
      </section>
    </div>
  );
}
