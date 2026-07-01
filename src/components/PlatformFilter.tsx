import type { ReactNode } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

const PLATFORM_ICONS: Record<string, ReactNode> = {
  instagram: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  youtube: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  ),
  tiktok: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
};

export function PlatformFilter() {
  const selected = useSearchStore((s) => s.platform);
  const searchQuery = useSearchStore((s) => s.searchQuery);
  const setPlatform = useSearchStore((s) => s.setPlatform);
  const setSearchQuery = useSearchStore((s) => s.setSearchQuery);

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Platform segmented control */}
        <div
          className="flex p-0.5 rounded-lg gap-0.5 self-start"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {PLATFORMS.map((p) => {
            const active = selected === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150"
                style={{
                  backgroundColor: active ? "rgba(255,255,255,0.09)" : "transparent",
                  color: active ? "#f0f4ff" : "#64748b",
                  boxShadow: active ? "0 1px 3px rgba(0,0,0,0.4)" : "none",
                }}
              >
                <span className={active ? "text-blue-400" : "text-slate-600"}>
                  {PLATFORM_ICONS[p]}
                </span>
                {getPlatformLabel(p)}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ color: "#4b5563" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creators..."
            className="w-full pl-9 pr-8 py-1.5 text-sm rounded-lg outline-none transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#f0f4ff",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center transition-colors"
              style={{ color: "#4b5563" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
