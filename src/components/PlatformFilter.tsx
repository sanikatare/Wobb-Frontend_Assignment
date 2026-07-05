import { Search, X, Camera, PlaySquare, Music2 } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import type { Platform } from "@/types";

const PLATFORM_ICONS: Record<Platform, typeof Camera> = {
  instagram: Camera,
  youtube: PlaySquare,
  tiktok: Music2,
};

const PLATFORM_ACTIVE_STYLE: Record<Platform, { bg: string; text: string }> = {
  instagram: { bg: "linear-gradient(135deg,#F59E0B,#E1306C,#8B5CF6)", text: "#FFFFFF" },
  youtube: { bg: "#EA4335", text: "#FFFFFF" },
  tiktok: { bg: "#202124", text: "#FFFFFF" },
};

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function PlatformFilter() {
  const selected = useSearchStore((s) => s.platform);
  const searchQuery = useSearchStore((s) => s.searchQuery);
  const setPlatform = useSearchStore((s) => s.setPlatform);
  const setSearchQuery = useSearchStore((s) => s.setSearchQuery);

  return (
    <div className="rounded-full p-1.5 bg-white border border-line shadow-sm focus-within:border-primary/40 focus-within:shadow-md transition-all flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-1 mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search creators..."
          aria-label="Search creators"
          className={`w-full bg-transparent border-0 pl-10 pr-8 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none ${focusRing} rounded-full`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
            className={`absolute inset-y-0 right-0 pr-3.5 flex items-center text-ink-muted hover:text-ink transition-colors ${focusRing} rounded-md`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Platform toggle */}
      <div role="tablist" aria-label="Platform" className="flex gap-0.5 shrink-0 px-0.5 sm:px-0">
        {PLATFORMS.map((p) => {
          const Icon = PLATFORM_ICONS[p];
          const active = selected === p;
          const activeStyle = PLATFORM_ACTIVE_STYLE[p];
          return (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setPlatform(p)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full transition-all duration-150 ${focusRing} ${
                active ? "shadow-sm" : "text-ink-secondary hover:bg-canvas-2"
              }`}
              style={active ? { background: activeStyle.bg, color: activeStyle.text } : undefined}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{getPlatformLabel(p)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
