import { memo } from "react";
import type { UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  onProfileClick?: (username: string) => void;
}

function ProfileListComponent({ profiles }: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div
        className="w-full flex flex-col items-center justify-center py-16 px-4 rounded-xl text-center"
        style={{ backgroundColor: "#0d1117", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
          style={{ backgroundColor: "rgba(59,130,246,0.08)", color: "#3b82f6" }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-white mb-1">No creators found</p>
        <p className="text-xs max-w-xs" style={{ color: "#4b5563" }}>
          Try adjusting your search or switching platforms.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {profiles.map((profile) => (
        <ProfileCard key={profile.user_id} profile={profile} />
      ))}
    </div>
  );
}

export const ProfileList = memo(ProfileListComponent);
