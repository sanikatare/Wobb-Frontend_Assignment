import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface ListState {
  profiles: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  hasProfile: (userId: string) => boolean;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      profiles: [],
      addProfile: (profile) =>
        set((state) => {
          if (state.profiles.some((item) => item.user_id === profile.user_id)) {
            return state;
          }

          return { profiles: [...state.profiles, profile] };
        }),
      removeProfile: (userId) =>
        set((state) => ({
          profiles: state.profiles.filter((profile) => profile.user_id !== userId),
        })),
      hasProfile: (userId) =>
        get().profiles.some((profile) => profile.user_id === userId),
    }),
    {
      name: "influencer-list",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ profiles: state.profiles }),
    }
  )
);
