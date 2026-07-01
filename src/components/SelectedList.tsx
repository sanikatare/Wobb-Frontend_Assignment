import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useListStore } from "@/store/useListStore";
import { useSearchStore } from "@/store/useSearchStore";

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

  const cardStyle = {
    backgroundColor: "#0d1117",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "16px",
  } as const;

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <span className="text-sm font-semibold text-white">Campaign List</span>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-md"
          style={{ backgroundColor: "rgba(59,130,246,0.10)", color: "#60a5fa" }}
        >
          {profiles.length} creators
        </span>
      </div>

      {profiles.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-8 rounded-lg text-center"
          style={{ border: "1px dashed rgba(255,255,255,0.07)" }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <svg className="w-5 h-5" style={{ color: "#4b5563" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          </div>
          <p className="text-xs font-medium text-white mb-0.5">No creators added</p>
          <p className="text-[11px]" style={{ color: "#4b5563" }}>Add creators from the list to build your campaign.</p>
        </div>
      ) : (
        <>
          {/* Aggregated stats */}
          <div
            className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: "#4b5563" }}>Combined Reach</p>
              <p className="text-base font-semibold text-white font-display">{fmtReach(totalFollowers)}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: "#4b5563" }}>Avg Engagement</p>
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
                className="flex items-center gap-3 p-2 rounded-lg group transition-colors"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <img
                  src={profile.picture}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                />
                <Link
                  to={`/profile/${profile.username}?platform=${platform}`}
                  className="flex-1 min-w-0"
                >
                  <p className="text-xs font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                    @{profile.username}
                  </p>
                  <p className="text-[10px] truncate" style={{ color: "#4b5563" }}>{profile.fullname}</p>
                </Link>
                <button
                  type="button"
                  onClick={() => removeProfile(profile.user_id)}
                  className="p-1 rounded-md transition-colors shrink-0"
                  style={{ color: "#4b5563" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(239,68,68,0.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#4b5563"; (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
                  title="Remove"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
