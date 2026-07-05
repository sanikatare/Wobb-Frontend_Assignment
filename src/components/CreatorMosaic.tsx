import { useMemo } from "react";
import { extractProfiles } from "@/utils/dataHelpers";
import type { Platform } from "@/types";

/**
 * Signature hero visual for the landing page: a scattered wall of real
 * creator profile photos pulled straight from the app's own data — the
 * literal subject matter of the product — instead of an abstract graphic.
 * Purely decorative; reads no state, mutates nothing.
 */
const SPOTS: { top: string; left: string; size: number; rot: number }[] = [
  { top: "4%", left: "8%", size: 52, rot: -6 },
  { top: "2%", left: "26%", size: 40, rot: 8 },
  { top: "10%", left: "46%", size: 34, rot: -4 },
  { top: "3%", left: "64%", size: 46, rot: 5 },
  { top: "8%", left: "84%", size: 56, rot: -8 },
  { top: "26%", left: "3%", size: 38, rot: 10 },
  { top: "30%", left: "94%", size: 40, rot: -10 },
  { top: "46%", left: "12%", size: 44, rot: 6 },
  { top: "50%", left: "90%", size: 34, rot: 4 },
  { top: "64%", left: "5%", size: 36, rot: -5 },
  { top: "68%", left: "96%", size: 48, rot: 7 },
  { top: "82%", left: "16%", size: 40, rot: -7 },
  { top: "88%", left: "40%", size: 32, rot: 9 },
  { top: "84%", left: "60%", size: 38, rot: -3 },
  { top: "80%", left: "80%", size: 44, rot: 6 },
  { top: "94%", left: "94%", size: 36, rot: -9 },
];

export function CreatorMosaic() {
  const photos = useMemo(() => {
    const platforms: Platform[] = ["instagram", "youtube", "tiktok"];
    const pool = platforms.flatMap((p) => extractProfiles(p));
    // Deterministic pick so layout doesn't reshuffle on re-render.
    return SPOTS.map((spot, i) => ({ ...spot, profile: pool[(i * 5) % pool.length] })).filter(
      (s) => s.profile
    );
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ maskImage: "radial-gradient(ellipse 65% 55% at 50% 40%, black 30%, transparent 78%)" }}
      aria-hidden="true"
    >
      {photos.map(({ top, left, size, rot, profile }, i) => (
        <img
          key={profile.user_id + i}
          src={profile.picture}
          alt=""
          width={size}
          height={size}
          className="absolute rounded-full object-cover border-2 border-white shadow-md"
          style={{ top, left, width: size, height: size, transform: `rotate(${rot}deg)` }}
          loading="lazy"
        />
      ))}
    </div>
  );
}
