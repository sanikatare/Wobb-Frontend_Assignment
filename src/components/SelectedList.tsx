import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Users, X } from "lucide-react";
import { useListStore } from "@/store/useListStore";
import { useSearchStore } from "@/store/useSearchStore";
import { Card } from "@/components/ui/card";

function fmtReach(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

export function SelectedList() {
  const profiles = useListStore((s) => s.profiles);
  const removeProfile = useListStore((s) => s.removeProfile);
  const platform = useSearchStore((s) => s.platform);

  const { totalFollowers, avgEngagement } = useMemo(() => {
    let eCount = 0, eTotal = 0, fTotal = 0;
    for (const p of profiles) {
      fTotal += p.followers || 0;
      if (p.engagement_rate !== undefined) { eCount++; eTotal += p.engagement_rate; }
    }
    return { totalFollowers: fTotal, avgEngagement: eCount > 0 ? (eTotal / eCount) * 100 : null };
  }, [profiles]);

  const stackPreview = profiles.slice(0, 5);
  const overflowCount = profiles.length - stackPreview.length;

  return (
    <Card className="p-4">
      {/* Header with avatar stack */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
        <div>
          <span className="text-sm font-semibold text-ink block">Campaign Roster</span>
          {profiles.length > 0 ? (
            <div className="flex items-center mt-1.5 -space-x-2">
              {stackPreview.map((p) => (
                <img
                  key={p.user_id}
                  src={p.picture}
                  alt={p.fullname}
                  className="w-6 h-6 rounded-full object-cover border-2 border-white"
                />
              ))}
              {overflowCount > 0 && (
                <span className="w-6 h-6 rounded-full border-2 border-white bg-canvas-2 text-ink-secondary text-[9px] font-semibold flex items-center justify-center">
                  +{overflowCount}
                </span>
              )}
            </div>
          ) : (
            <span className="text-[11px] text-ink-muted">Empty for now</span>
          )}
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-soft text-primary shrink-0">
          {profiles.length}
        </span>
      </div>

      {profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 rounded-xl text-center border border-dashed border-line">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2 bg-canvas-2">
            <Users className="w-5 h-5 text-ink-muted" strokeWidth={1.5} />
          </div>
          <p className="text-xs font-medium text-ink mb-0.5">No creators added</p>
          <p className="text-[11px] text-ink-secondary">Add creators from the list to build your campaign.</p>
        </div>
      ) : (
        <>
          {/* Aggregated stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-canvas-2 border border-line border-l-2" style={{ borderLeftColor: "#1A73E8" }}>
              <p className="text-[10px] font-medium uppercase tracking-wider mb-1 text-ink-muted">Combined Reach</p>
              <p className="text-base font-semibold text-ink font-display">{fmtReach(totalFollowers)}</p>
            </div>
            <div className="p-3 rounded-xl bg-canvas-2 border border-line border-l-2" style={{ borderLeftColor: "#34A853" }}>
              <p className="text-[10px] font-medium uppercase tracking-wider mb-1 text-ink-muted">Avg Engagement</p>
              <p className="text-base font-semibold text-ink font-display">
                {avgEngagement !== null ? `${avgEngagement.toFixed(1)}%` : "—"}
              </p>
            </div>
          </div>

          {/* Creator list */}
          <div className="flex flex-col gap-1 max-h-80 overflow-y-auto pr-0.5">
            {profiles.map((profile) => (
              <div
                key={profile.user_id}
                className="flex items-center gap-3 p-2 rounded-xl group transition-colors hover:bg-canvas-2"
              >
                <img
                  src={profile.picture}
                  alt={profile.fullname}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-line"
                />
                <Link
                  to={`/profile/${profile.username}?platform=${platform}`}
                  className="flex-1 min-w-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <p className="text-xs font-medium text-ink truncate group-hover:text-primary transition-colors">
                    @{profile.username}
                  </p>
                  <p className="text-[10px] truncate text-ink-secondary">{profile.fullname}</p>
                </Link>
                <button
                  type="button"
                  onClick={() => removeProfile(profile.user_id)}
                  className="p-1.5 rounded-md transition-colors shrink-0 text-ink-muted hover:text-danger hover:bg-danger/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`Remove @${profile.username} from campaign`}
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
