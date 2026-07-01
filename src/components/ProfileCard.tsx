import { memo } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useListStore } from "@/store/useListStore";
import { useSearchStore } from "@/store/useSearchStore";
import type { UserProfileSummary } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

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
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48" fill="white" />
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
        className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] rounded-full text-white flex items-center justify-center"
        style={{
          background:
            platform === "instagram"
              ? "linear-gradient(135deg,#f59e0b,#e11d48,#7c3aed)"
              : platform === "youtube"
                ? "#dc2626"
                : "#1e293b",
          outline: "2px solid #070b14",
        }}
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
      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer group transition-all duration-150 animate-fade-in bg-slate-900/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-900"
    >
      {/* Avatar */}
      <div className="relative shrink-0 w-11 h-11">
        <img
          src={profile.picture}
          alt={profile.fullname}
          className="w-full h-full rounded-full object-cover border border-slate-700"
        />
        <PlatformDot platform={platform} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 text-sm font-medium text-white truncate">
          <span className="truncate">@{profile.username}</span>
          {profile.is_verified && (
            <svg className="w-4 h-4 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          )}
        </div>
        <div className="text-xs truncate mt-0.5 text-slate-400">{profile.fullname}</div>
        <div className="flex items-center gap-2 mt-1.5">
          <Badge variant="primary" size="sm">
            {fmt(profile.followers)}
          </Badge>
          {profile.engagement_rate !== undefined && (
            <Badge variant="success" size="sm">
              {(profile.engagement_rate * 100).toFixed(1)}% ER
            </Badge>
          )}
        </div>
      </div>

      {/* Add button */}
      <Button
        variant={isSelected ? "tertiary" : "primary"}
        size="sm"
        disabled={isSelected}
        onClick={(e) => {
          e.stopPropagation();
          addProfile(profile);
        }}
        className="shrink-0"
      >
        {isSelected ? "Added" : "+ Add"}
      </Button>
    </div>
  );
}

export const ProfileCard = memo(ProfileCardComponent);
