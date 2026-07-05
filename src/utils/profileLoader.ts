import type { ProfileDetailResponse } from "@/types";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const filename = `${username}.json`;
  const path = `../assets/data/profiles/${filename}`;
  const loader = profileModules[path];
  const fallbackPath = Object.keys(profileModules).find((modulePath) =>
    modulePath.toLowerCase().endsWith(`/${filename.toLowerCase()}`)
  );
  const loadProfile = loader ?? (fallbackPath ? profileModules[fallbackPath] : null);

  if (!loadProfile) {
    return null;
  }

  const result = await loadProfile();
  const data =
    (result as { default?: ProfileDetailResponse }).default ?? result;
  return data as ProfileDetailResponse;
}
