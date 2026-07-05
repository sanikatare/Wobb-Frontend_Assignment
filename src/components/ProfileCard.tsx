import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useListStore } from "@/store/useListStore";
import { useSearchStore } from "@/store/useSearchStore";
import type { UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return String(n);
}

// Engagement rate visualized against a realistic ceiling rather than 0-100%,
// so the bar actually differentiates creators instead of looking near-empty.
const ENGAGEMENT_CEILING = 0.08;

function ProfileCardComponent({ profile, rank }: { profile: UserProfileSummary; rank: number }) {
  const navigate = useNavigate();
  const platform = useSearchStore((s) => s.platform);
  const addProfile = useListStore((s) => s.addProfile);
  const isSelected = useListStore((s) => s.hasProfile(profile.user_id));

  const engagementPct = profile.engagement_rate !== undefined
    ? Math.min(100, (profile.engagement_rate / ENGAGEMENT_CEILING) * 100)
    : null;

  const open = () => navigate(`/profile/${profile.username}?platform=${platform}`);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } }}
      aria-label={`View @${profile.username}'s profile, ranked ${rank}`}
      className="grid grid-cols-[2rem_1fr_auto] sm:grid-cols-[2rem_2fr_1fr_auto] items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl cursor-pointer group transition-colors animate-fade-in bg-white border border-line hover:border-[#DADCE0] hover:bg-canvas-2/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {/* Rank */}
      <span className="text-xs font-mono font-medium text-center text-ink-muted">
        {String(rank).padStart(2, "0")}
      </span>

      {/* Identity */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={profile.picture}
          alt={profile.fullname}
          className="w-9 h-9 rounded-full object-cover border border-line shrink-0"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-sm font-medium text-ink truncate">
            <span className="truncate">@{profile.username}</span>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <div className="text-xs truncate text-ink-secondary">{profile.fullname}</div>
        </div>
      </div>

      {/* Engagement bar (hidden on narrow screens) */}
      <div className="hidden sm:flex flex-col gap-1 min-w-[104px]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-ink-muted">{fmt(profile.followers)} followers</span>
          {engagementPct !== null && (
            <span className="text-[10px] font-semibold text-primary">{(profile.engagement_rate! * 100).toFixed(1)}%</span>
          )}
        </div>
        <div className="h-1.5 rounded-full bg-line overflow-hidden">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${engagementPct ?? 0}%` }}
          />
        </div>
      </div>

      {/* Add button */}
      <button
        type="button"
        disabled={isSelected}
        onClick={(e) => { e.stopPropagation(); addProfile(profile); }}
        className={`shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          isSelected
            ? "bg-canvas-2 text-ink-muted cursor-not-allowed"
            : "bg-primary-soft text-primary border border-primary/20 hover:bg-primary hover:text-white"
        }`}
      >
        {isSelected ? "Added" : "+ Add"}
      </button>
    </div>
  );
}

export const ProfileCard = memo(ProfileCardComponent);
