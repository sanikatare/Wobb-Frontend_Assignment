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
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-primary">
              Discover · {getPlatformLabel(platform)}
            </p>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-canvas-2 text-ink-secondary border border-line">
              {filtered.length} of {allProfiles.length}
            </span>
          </div>

          <PlatformFilter />
          <ProfileList profiles={filtered} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <SelectedList />
        </div>
      </div>
    </Layout>
  );
}
