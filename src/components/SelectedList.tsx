import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useListStore } from "@/store/useListStore";
import { useSearchStore } from "@/store/useSearchStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

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
    let eCount = 0,
      eTotal = 0,
      fTotal = 0;
    for (const p of profiles) {
      fTotal += p.followers || 0;
      if (p.engagement_rate !== undefined) {
        eCount++;
        eTotal += p.engagement_rate;
      }
    }
    return {
      totalFollowers: fTotal,
      avgEngagement: eCount > 0 ? (eTotal / eCount) * 100 : null,
    };
  }, [profiles]);

  return (
    <Card className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50 p-4">
        <span className="text-sm font-semibold text-white">Campaign List</span>
        <Badge variant="primary">{profiles.length} creators</Badge>
      </div>

      {profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2 bg-slate-800/50">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.456-6.064-1.278m0 0a11.852 11.852 0 0 0-7.08-3.6M9 19.5c1.921.293 3.926.446 6 .446s4.079-.153 6-.446m0 0a11.852 11.852 0 0 1-7.08 3.6M9 19.5v-.001V9m6 0v10.5m0 0a11.852 11.852 0 0 0 7.08-3.6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
          <p className="text-xs font-medium text-white mb-0.5">No creators added</p>
          <p className="text-[11px] text-slate-500">Add creators from the list to build your campaign.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-4 gap-4">
          {/* Aggregated stats */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider mb-1 text-slate-500">
                Combined Reach
              </p>
              <p className="text-base font-semibold text-white font-display">{fmtReach(totalFollowers)}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider mb-1 text-slate-500">
                Avg Engagement
              </p>
              <p className="text-base font-semibold text-white font-display">
                {avgEngagement !== null ? `${avgEngagement.toFixed(1)}%` : "—"}
              </p>
            </div>
          </div>

          {/* Creator list */}
          <div className="flex flex-col gap-1 max-h-80 overflow-y-auto pr-0.5">
            {profiles.map((profile) => (
              <div
                key={profile.user_id}
                className="flex items-center gap-3 p-2 rounded-lg group hover:bg-slate-800/50 transition-colors duration-200"
              >
                <img
                  src={profile.picture}
                  alt={profile.fullname}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-700"
                />
                <Link
                  to={`/profile/${profile.username}?platform=${platform}`}
                  className="flex-1 min-w-0"
                >
                  <p className="text-xs font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                    @{profile.username}
                  </p>
                  <p className="text-[10px] truncate text-slate-500">{profile.fullname}</p>
                </Link>
                <button
                  type="button"
                  onClick={() => removeProfile(profile.user_id)}
                  className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-900/20 transition-colors duration-200 shrink-0"
                  title="Remove"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
