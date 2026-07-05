import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Camera, PlaySquare, Music2, Sparkles, Target } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CreatorMosaic } from "@/components/CreatorMosaic";
import type { Platform } from "@/types";

const BRANDS = ["Nike", "Sephora", "Gymshark", "Samsung", "Figma", "Notion", "Spotify", "Adobe"];

const PLATFORM_TOGGLES: { key: Platform; icon: typeof Camera; label: string; activeBg: string; activeText: string; ring: string }[] = [
  { key: "instagram", icon: Camera, label: "Instagram", activeBg: "#FCE8F3", activeText: "#C2185B", ring: "#E1306C" },
  { key: "youtube", icon: PlaySquare, label: "YouTube", activeBg: "#FCE8E6", activeText: "#C5221F", ring: "#EA4335" },
  { key: "tiktok", icon: Music2, label: "TikTok", activeBg: "#F1F3F4", activeText: "#3C4043", ring: "#3C4043" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function LandingPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activePlatforms, setActivePlatforms] = useState<Set<Platform>>(
    new Set(["instagram", "youtube", "tiktok"])
  );

  const goToDiscover = () => navigate("/discover");

  const togglePlatform = (p: Platform) => {
    setActivePlatforms((prev) => {
      const next = new Set(prev);
      if (next.has(p) && next.size > 1) next.delete(p);
      else next.add(p);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white text-ink overflow-x-clip">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient color wash */}
        <div
          className="absolute inset-x-0 top-0 h-[560px] -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 10%, rgba(26,115,232,0.14) 0%, transparent 60%), " +
              "radial-gradient(50% 45% at 85% 15%, rgba(139,92,246,0.12) 0%, transparent 60%), " +
              "radial-gradient(45% 40% at 50% 55%, rgba(225,48,108,0.08) 0%, transparent 65%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <CreatorMosaic />

          <div className="relative">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-primary mb-5">
              12M+ creators · 3 platforms · one search
            </p>

            <h1 className="font-sans text-[40px] sm:text-[52px] lg:text-[56px] font-bold leading-[1.05] tracking-tight text-ink">
              Search creators
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(100deg, #1A73E8 0%, #8B5CF6 55%, #E1306C 100%)" }}
              >
                like you'd search anything else.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed max-w-md mx-auto text-ink-secondary">
              Instagram, YouTube, and TikTok in one bar — ranked by real audience
              fit, not follower count.
            </p>

            {/* Functional-looking search pill */}
            <form
              onSubmit={(e) => { e.preventDefault(); goToDiscover(); }}
              className="mt-9 mx-auto max-w-xl rounded-full p-1.5 bg-white border border-line shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-primary/40 transition-all flex items-center gap-1"
            >
              <div className="flex items-center gap-2 pl-3.5 flex-1 min-w-0">
                <Search className="w-4 h-4 shrink-0 text-ink-muted" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Fitness creators, 50K–200K followers, US audience..."
                  aria-label="Search creators"
                  className={`w-full bg-transparent border-0 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none ${focusRing}`}
                />
              </div>
              <button
                type="submit"
                className={`shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-white px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover shadow-sm transition-colors ${focusRing}`}
              >
                Search
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Platform toggles */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {PLATFORM_TOGGLES.map(({ key, icon: Icon, label, activeBg, activeText }) => {
                const active = activePlatforms.has(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => togglePlatform(key)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${focusRing}`}
                    style={
                      active
                        ? { backgroundColor: activeBg, color: activeText, borderColor: "transparent" }
                        : { backgroundColor: "#FFFFFF", color: "#80868B", borderColor: "#E8EAED" }
                    }
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted-by ticker ────────────────────────────────────────────── */}
      <section className="relative py-8 border-t border-b border-line">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-marquee items-center">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span key={`${brand}-${i}`} className="mx-8 flex items-center gap-2 whitespace-nowrap">
                <span className="text-[10px] font-mono text-ink-muted">0{(i % BRANDS.length) + 1}</span>
                <span className="text-base font-semibold text-ink-secondary/70 hover:text-ink-secondary transition-colors">
                  {brand}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bento value props ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-8 max-w-md">
            Built around fit, not follower count.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:auto-rows-[minmax(0,1fr)]">
            {/* Large tile */}
            <div className="sm:col-span-2 sm:row-span-2 rounded-2xl p-7 bg-canvas-2 border border-line flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 bg-primary-soft text-primary">
                  <Target className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-sans text-lg font-semibold text-ink mb-2">AI audience matching</h3>
                <p className="text-sm leading-relaxed text-ink-secondary max-w-sm">
                  Describe your target audience in plain language. Every creator
                  in the results is scored against it — not just sorted by
                  who has the most followers.
                </p>
              </div>

              {/* Match gauge */}
              <div className="mt-6 p-4 rounded-xl bg-white border border-line">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-ink-secondary">Audience match score</span>
                  <span className="text-sm font-bold text-primary font-sans">94%</span>
                </div>
                <div className="h-2 rounded-full bg-line overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: "94%" }} />
                </div>
              </div>
            </div>

            {/* Small tile 1 */}
            <div className="rounded-2xl p-6 bg-white border border-line hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "#F3EEFE", color: "#8B5CF6" }}>
                <Search className="w-4 h-4" />
              </div>
              <h3 className="font-sans text-sm font-semibold text-ink mb-1.5">Unified search</h3>
              <p className="text-xs leading-relaxed text-ink-secondary">
                Instagram, YouTube, and TikTok merged into a single ranked list.
              </p>
            </div>

            {/* Small tile 2 */}
            <div className="rounded-2xl p-6 bg-white border border-line hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 bg-[#E6F4EA] text-[#188038]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-sans text-sm font-semibold text-ink mb-1.5">Engagement, not vanity</h3>
              <p className="text-xs leading-relaxed text-ink-secondary">
                Every profile is scored on real engagement before it reaches your shortlist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-line">
        <div
          className="relative overflow-hidden max-w-3xl mx-auto rounded-2xl p-10 sm:p-14 text-center border border-line"
          style={{
            background:
              "radial-gradient(120% 100% at 0% 0%, rgba(26,115,232,0.10) 0%, transparent 55%), " +
              "radial-gradient(120% 100% at 100% 100%, rgba(139,92,246,0.10) 0%, transparent 55%), #F8F9FA",
          }}
        >
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-ink max-w-md mx-auto">
            Your next creator partnership is already in the network.
          </h2>
          <button
            type="button"
            onClick={goToDiscover}
            className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-full bg-primary hover:bg-primary-hover shadow-sm hover:shadow-md transition-all ${focusRing}`}
          >
            Start Discovering
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <p className="mt-12 text-center text-[11px] text-ink-muted">
          © {new Date().getFullYear()} VibeCreator. All rights reserved.
        </p>
      </section>
    </div>
  );
}
