import { memo } from "react";
import { Users } from "lucide-react";
import type { UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  onProfileClick?: (username: string) => void;
}

function ProfileListComponent({ profiles }: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 px-4 rounded-2xl text-center bg-white border border-line">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-primary-soft text-primary">
          <Users className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-ink mb-1">No creators found</p>
        <p className="text-xs max-w-xs text-ink-secondary">
          Try adjusting your search or switching platforms.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {profiles.map((profile, i) => (
        <ProfileCard key={profile.user_id} profile={profile} rank={i + 1} />
      ))}
    </div>
  );
}

export const ProfileList = memo(ProfileListComponent);
