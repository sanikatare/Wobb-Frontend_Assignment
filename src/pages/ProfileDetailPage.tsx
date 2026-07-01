import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useListStore } from "@/store/useListStore";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
function ProfileSkeleton() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto animate-pulse">
        <div className="skeleton h-4 w-28 mb-6 rounded" />
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="skeleton h-28 w-full" />
          <div className="p-6 pt-14 relative">
            <div className="absolute -top-10 left-6 w-20 h-20 rounded-full skeleton" />
            <div className="skeleton h-6 w-40 mb-2 rounded" />
            <div className="skeleton h-4 w-28 mb-6 rounded" />
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton h-16 rounded-lg" />)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// ─── KPI card ────────────────────────────────────────────────────────────────
function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  const color = accent || "rgba(59,130,246,0.1)";
  return (
    <div
      className="flex flex-col gap-1 p-4 rounded-lg"
      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#4b5563" }}>{label}</span>
      <span className="text-lg font-semibold text-white font-display">{value}</span>
      <div className="h-0.5 w-8 rounded-full mt-1" style={{ backgroundColor: color }} />
    </div>
  );
}

// ─── Platform helpers ─────────────────────────────────────────────────────────
function getPlatformMeta(platform: string) {
  switch (platform) {
    case "instagram": return { label: "Instagram", bannerFrom: "#f59e0b", bannerTo: "#7c3aed", pill: { bg: "rgba(225,48,108,0.10)", text: "#f472b6" } };
    case "youtube":   return { label: "YouTube",   bannerFrom: "#dc2626", bannerTo: "#991b1b",  pill: { bg: "rgba(239,68,68,0.10)",  text: "#f87171" } };
    case "tiktok":    return { label: "TikTok",    bannerFrom: "#0f172a", bannerTo: "#1e293b",  pill: { bg: "rgba(255,255,255,0.06)", text: "#94a3b8" } };
    default:          return { label: platform,    bannerFrom: "#1d4ed8", bannerTo: "#1e3a8a",  pill: { bg: "rgba(59,130,246,0.10)", text: "#60a5fa" } };
  }
}

function getPlatformFromUrl(url?: string) {
  if (!url) return "unknown";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("tiktok.com")) return "tiktok";
  return "unknown";
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";

  const [state, setState] = useState<{ data: ProfileDetailResponse | null; loaded: boolean }>({ data: null, loaded: false });
  const addProfile = useListStore((s) => s.addProfile);
  const isSelected = useListStore((s) => state.data ? s.hasProfile(state.data.data.user_profile.user_id) : false);

  useEffect(() => {
    if (!username) return;
    let active = true;
    setState({ data: null, loaded: false });
    loadProfileByUsername(username)
      .then(data => { if (active) setState({ data, loaded: true }); })
      .catch(() => { if (active) setState({ data: null, loaded: true }); });
    return () => { active = false; };
  }, [username]);

  if (!username) return (
    <Layout>
      <div className="max-w-sm mx-auto text-center py-12 px-6 rounded-xl" style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-sm text-red-400 mb-4">Invalid profile request</p>
        <Link to="/discover" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">← Back to search</Link>
      </div>
    </Layout>
  );

  if (!state.loaded) return <ProfileSkeleton />;

  if (!state.data) return (
    <Layout>
      <div className="max-w-sm mx-auto text-center py-12 px-6 rounded-xl" style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "rgba(239,68,68,0.10)", color: "#ef4444" }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
        </div>
        <p className="text-sm font-medium text-white mb-1">Profile unavailable</p>
        <p className="text-xs mb-4" style={{ color: "#4b5563" }}>Could not load @{username}.</p>
        <Link to="/discover" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">← Back to search</Link>
      </div>
    </Layout>
  );

  const user: FullUserProfile = state.data.data.user_profile;
  const resolvedPlatform = platform !== "unknown" ? platform : getPlatformFromUrl(user.url);
  const meta = getPlatformMeta(resolvedPlatform);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          to="/discover"
          className="inline-flex items-center gap-1.5 text-xs font-medium mb-5 transition-colors"
          style={{ color: "#64748b" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#3b82f6")}
          onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
          Back to Discover
        </Link>

        <div className="rounded-xl overflow-hidden animate-slide-up" style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Banner */}
          <div
            className="h-28 w-full relative"
            style={{ background: `linear-gradient(135deg, ${meta.bannerFrom}, ${meta.bannerTo})` }}
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          </div>

          <div className="px-6 pb-6 relative">
            {/* Avatar */}
            <div
              className="absolute -top-10 left-6 w-20 h-20 rounded-full overflow-hidden"
              style={{ border: "3px solid #0d1117" }}
            >
              <img src={user.picture} alt={user.fullname} className="w-full h-full object-cover" />
            </div>

            {/* Actions row */}
            <div className="flex items-start justify-end pt-3 gap-2 mb-8">
              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                >
                  View Profile
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              )}
              <button
                type="button"
                disabled={isSelected}
                onClick={() => addProfile(user)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                style={
                  isSelected
                    ? { backgroundColor: "rgba(255,255,255,0.04)", color: "#4b5563", cursor: "not-allowed" }
                    : { background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "#fff", boxShadow: "0 0 16px rgba(59,130,246,0.2)" }
                }
              >
                {isSelected ? (
                  <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Added</>
                ) : ("+ Add to Campaign")}
              </button>
            </div>

            {/* Identity */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold text-white font-display">@{user.username}</h2>
                <VerifiedBadge verified={user.is_verified} />
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: meta.pill.bg, color: meta.pill.text }}
                >
                  {meta.label}
                </span>
              </div>
              <p className="text-sm" style={{ color: "#64748b" }}>{user.fullname}</p>
              {user.description && (
                <p
                  className="mt-3 text-sm leading-relaxed pl-3"
                  style={{ color: "#94a3b8", borderLeft: "2px solid rgba(59,130,246,0.3)" }}
                >
                  {user.description}
                </p>
              )}
            </div>

            {/* KPI grid */}
            <div className="mb-2">
              <p className="text-[10px] font-medium uppercase tracking-wider mb-3" style={{ color: "#4b5563" }}>Performance</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Stat label="Followers" value={fmt(user.followers)} accent="rgba(59,130,246,0.5)" />
                {user.engagement_rate !== undefined && (
                  <Stat label="Engagement" value={(user.engagement_rate * 100).toFixed(2) + "%"} accent="rgba(16,185,129,0.5)" />
                )}
                {user.posts_count !== undefined && (
                  <Stat label="Total Posts" value={String(user.posts_count)} accent="rgba(168,85,247,0.5)" />
                )}
                {user.avg_likes !== undefined && (
                  <Stat label="Avg Likes" value={fmt(user.avg_likes)} accent="rgba(245,158,11,0.5)" />
                )}
                {user.avg_comments !== undefined && (
                  <Stat label="Avg Comments" value={user.avg_comments.toLocaleString()} accent="rgba(239,68,68,0.5)" />
                )}
                {user.avg_views !== undefined && user.avg_views > 0 && (
                  <Stat label="Avg Views" value={fmt(user.avg_views)} accent="rgba(34,211,238,0.5)" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
