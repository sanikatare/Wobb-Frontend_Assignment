import { memo } from "react";
import type { ReactNode } from "react";
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

function PlatformDot({ platform }: { platform: string }) {
  const styles: Record<string, { bg: string; icon: ReactNode }> = {
    instagram: {
      bg: "from-yellow-500 via-rose-500 to-purple-600",
      icon: (
        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        </svg>
      ),
    },
    youtube: {
      bg: "from-red-600 to-red-500",
      icon: (
        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8z" />
        </svg>
      ),
    },
    tiktok: {
      bg: "from-slate-800 to-slate-900",
      icon: (
        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
  };
  const s = styles[platform];
  if (!s) return null;
  return (
    <span
      className={`absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-gradient-to-tr ${s.bg} text-white flex items-center justify-center`}
      style={{ outline: "2px solid #070b14" }}
    >
      <span
        className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-gradient-to-tr text-white flex items-center justify-center"
        style={{ background: platform === "instagram" ? "linear-gradient(135deg,#f59e0b,#e11d48,#7c3aed)" : platform === "youtube" ? "#dc2626" : "#1e293b", outline: "2px solid #070b14" }}
      >
        {s.icon}
      </span>
    </span>
  );
}

function ProfileCardComponent({ profile }: { profile: UserProfileSummary }) {
  const navigate = useNavigate();
  const platform = useSearchStore((s) => s.platform);
  const addProfile = useListStore((s) => s.addProfile);
  const isSelected = useListStore((s) => s.hasProfile(profile.user_id));

  return (
    <div
      onClick={() => navigate(`/profile/${profile.username}?platform=${platform}`)}
      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer group transition-all duration-150 animate-fade-in"
      style={{
        backgroundColor: "#0d1117",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.11)";
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#111827";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#0d1117";
      }}
    >
      {/* Avatar */}
      <div className="relative shrink-0 w-11 h-11">
        <img
          src={profile.picture}
          alt={profile.fullname}
          className="w-full h-full rounded-full object-cover"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        />
        <PlatformDot platform={platform} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 text-sm font-medium text-white truncate">
          <span className="truncate">@{profile.username}</span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-xs truncate mt-0.5" style={{ color: "#64748b" }}>{profile.fullname}</div>
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className="text-[11px] font-medium px-1.5 py-0.5 rounded"
            style={{ backgroundColor: "rgba(59,130,246,0.10)", color: "#60a5fa" }}
          >
            {fmt(profile.followers)}
          </span>
          {profile.engagement_rate !== undefined && (
            <span
              className="text-[11px] font-medium px-1.5 py-0.5 rounded"
              style={{ backgroundColor: "rgba(16,185,129,0.10)", color: "#34d399" }}
            >
              {(profile.engagement_rate * 100).toFixed(1)}% ER
            </span>
          )}
        </div>
      </div>

      {/* Add button */}
      <button
        type="button"
        disabled={isSelected}
        onClick={e => { e.stopPropagation(); addProfile(profile); }}
        className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
        style={
          isSelected
            ? { backgroundColor: "rgba(255,255,255,0.04)", color: "#4b5563", cursor: "not-allowed" }
            : { backgroundColor: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }
        }
        onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(59,130,246,0.2)"; }}
        onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(59,130,246,0.12)"; }}
      >
        {isSelected ? "Added" : "+ Add"}
      </button>
    </div>
  );
}

export const ProfileCard = memo(ProfileCardComponent);
