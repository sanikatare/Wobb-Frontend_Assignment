import { useMemo } from "react";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { SelectedList } from "@/components/SelectedList";
import { useSearchStore } from "@/store/useSearchStore";
import { extractProfiles, filterProfiles, getPlatformLabel } from "@/utils/dataHelpers";

export function SearchPage() {
  const platform = useSearchStore((s) => s.platform);
  const searchQuery = useSearchStore((s) => s.searchQuery);

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(() => filterProfiles(allProfiles, searchQuery), [allProfiles, searchQuery]);

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main panel */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-lg font-semibold text-white font-display">Find Creators</h1>
              <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>
                Browse top creators on {getPlatformLabel(platform)}
              </p>
            </div>
            <span
              className="text-xs font-medium px-2 py-1 rounded-md"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#64748b", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {filtered.length} of {allProfiles.length}
            </span>
          </div>

          <PlatformFilter />
          <ProfileList profiles={filtered} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-20">
          <SelectedList />
        </div>
      </div>
    </Layout>
  );
}
