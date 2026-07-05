import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, AlertTriangle, ExternalLink, Check } from "lucide-react";
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
        <div className="rounded-2xl overflow-hidden bg-white border border-line">
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
  const color = accent || "#1A73E8";
  return (
    <div className="flex flex-col gap-1 p-4 rounded-xl bg-canvas-2 border border-line">
      <span className="text-[10px] font-medium uppercase tracking-wider text-ink-muted">{label}</span>
      <span className="text-lg font-semibold text-ink font-display">{value}</span>
      <div className="h-0.5 w-8 rounded-full mt-1" style={{ backgroundColor: color }} />
    </div>
  );
}

// ─── Platform helpers ─────────────────────────────────────────────────────────
function getPlatformMeta(platform: string) {
  switch (platform) {
    case "instagram": return { label: "Instagram", bannerFrom: "#f59e0b", bannerTo: "#c026d3", pill: { bg: "#FCE8F3", text: "#C2185B" } };
    case "youtube":   return { label: "YouTube",   bannerFrom: "#ef4444", bannerTo: "#b91c1c", pill: { bg: "#FCE8E6", text: "#C5221F" } };
    case "tiktok":    return { label: "TikTok",    bannerFrom: "#3C4043", bannerTo: "#202124", pill: { bg: "#F1F3F4", text: "#3C4043" } };
    default:          return { label: platform,    bannerFrom: "#1A73E8", bannerTo: "#174EA6", pill: { bg: "#E8F0FE", text: "#1A73E8" } };
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
      <div className="max-w-sm mx-auto text-center py-12 px-6 rounded-2xl bg-white border border-line">
        <p className="text-sm text-danger mb-4">Invalid profile request</p>
        <Link to="/discover" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">← Back to search</Link>
      </div>
    </Layout>
  );

  if (!state.loaded) return <ProfileSkeleton />;

  if (!state.data) return (
    <Layout>
      <div className="max-w-sm mx-auto text-center py-12 px-6 rounded-2xl bg-white border border-line">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 bg-danger/10 text-danger">
          <AlertTriangle className="w-5 h-5" strokeWidth={2} />
        </div>
        <p className="text-sm font-medium text-ink mb-1">Profile unavailable</p>
        <p className="text-xs mb-4 text-ink-secondary">Could not load @{username}.</p>
        <Link to="/discover" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">← Back to search</Link>
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
          className="inline-flex items-center gap-1.5 text-xs font-medium mb-5 text-ink-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Discover
        </Link>

        <div className="rounded-2xl overflow-hidden animate-slide-up bg-white border border-line shadow-sm">
          {/* Banner */}
          <div
            className="h-28 w-full relative"
            style={{ background: `linear-gradient(135deg, ${meta.bannerFrom}, ${meta.bannerTo})` }}
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          </div>

          <div className="px-6 pb-6 relative">
            {/* Avatar */}
            <div className="absolute -top-10 left-6 w-20 h-20 rounded-full overflow-hidden border-[3px] border-white shadow-sm">
              <img src={user.picture} alt={user.fullname} className="w-full h-full object-cover" />
            </div>

            {/* Actions row */}
            <div className="flex items-start justify-end pt-3 gap-2 mb-8">
              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-canvas-2 text-ink-secondary border border-line hover:border-[#DADCE0] hover:text-ink transition-colors"
                >
                  View Profile
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                type="button"
                disabled={isSelected}
                onClick={() => addProfile(user)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isSelected
                    ? "bg-canvas-2 text-ink-muted cursor-not-allowed"
                    : "bg-primary text-white shadow-sm hover:bg-primary-hover hover:shadow-md"
                }`}
              >
                {isSelected ? (<><Check className="w-3.5 h-3.5" /> Added</>) : ("+ Add to Campaign")}
              </button>
            </div>

            {/* Identity */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold text-ink font-display">@{user.username}</h2>
                <VerifiedBadge verified={user.is_verified} />
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: meta.pill.bg, color: meta.pill.text }}
                >
                  {meta.label}
                </span>
              </div>
              <p className="text-sm text-ink-secondary">{user.fullname}</p>
              {user.description && (
                <p className="mt-3 text-sm leading-relaxed pl-3 text-ink-secondary border-l-2 border-primary/30">
                  {user.description}
                </p>
              )}
            </div>

            {/* KPI grid */}
            <div className="mb-2">
              <p className="text-[10px] font-medium uppercase tracking-wider mb-3 text-ink-muted">Performance</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Stat label="Followers" value={fmt(user.followers)} accent="#1A73E8" />
                {user.engagement_rate !== undefined && (
                  <Stat label="Engagement" value={(user.engagement_rate * 100).toFixed(2) + "%"} accent="#34A853" />
                )}
                {user.posts_count !== undefined && (
                  <Stat label="Total Posts" value={String(user.posts_count)} accent="#A142F4" />
                )}
                {user.avg_likes !== undefined && (
                  <Stat label="Avg Likes" value={fmt(user.avg_likes)} accent="#FBBC04" />
                )}
                {user.avg_comments !== undefined && (
                  <Stat label="Avg Comments" value={user.avg_comments.toLocaleString()} accent="#EA4335" />
                )}
                {user.avg_views !== undefined && user.avg_views > 0 && (
                  <Stat label="Avg Views" value={fmt(user.avg_views)} accent="#12B5CB" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
