/**
 * Design System Theme Tokens
 * Centralized color, spacing, and typography tokens for consistency
 */

export const theme = {
  colors: {
    // Surfaces
    page: "#070b14",
    surface: "#0d1117",
    "surface-hover": "#111827",
    "surface-active": "#1a202c",

    // Borders
    border: "rgba(255,255,255,0.06)",
    "border-hover": "rgba(255,255,255,0.11)",
    "border-light": "rgba(255,255,255,0.08)",

    // Text
    text: {
      primary: "#f0f4ff",
      secondary: "#94a3b8",
      tertiary: "#64748b",
      muted: "#4b5563",
      disabled: "#2d3748",
    },

    // Brand - Blue
    blue: {
      primary: "#3b82f6",
      dark: "#1d4ed8",
      light: "#60a5fa",
      lighter: "#93c5fd",
      dim: "rgba(59,130,246,0.10)",
      "dim-hover": "rgba(59,130,246,0.20)",
      glow: "rgba(59,130,246,0.25)",
    },

    // Status
    success: {
      primary: "#10b981",
      dim: "rgba(16,185,129,0.10)",
    },
    warning: {
      primary: "#f59e0b",
      dim: "rgba(245,158,11,0.10)",
    },
    error: {
      primary: "#ef4444",
      dim: "rgba(239,68,68,0.10)",
    },
    info: {
      primary: "#06b6d4",
      dim: "rgba(6,182,212,0.10)",
    },

    // Platforms
    instagram: "#e1306c",
    youtube: "#ff0000",
    tiktok: "#ffffff",
  },

  gradients: {
    // Primary brand gradient
    "brand-primary": "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
    "brand-accent": "linear-gradient(135deg, #60a5fa 0%, #93c5fd 50%, #38bdf8 100%)",
    "brand-glow": "0 0 28px rgba(59,130,246,0.28)",

    // Shimmer animation
    shimmer: "linear-gradient(90deg, #111827 0%, #1d2b3a 50%, #111827 100%)",
  },

  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.10)",
    lg: "0 8px 16px rgba(0, 0, 0, 0.15)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.20)",
    glow: "0 0 24px rgba(59,130,246,0.30)",
  },

  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem",  // 8px
    md: "1rem",    // 16px
    lg: "1.5rem",  // 24px
    xl: "2rem",    // 32px
    "2xl": "3rem", // 48px
  },

  borderRadius: {
    sm: "0.375rem",  // 6px
    md: "0.5rem",    // 8px
    lg: "0.75rem",   // 12px
    xl: "1rem",      // 16px
    full: "9999px",
  },

  transitions: {
    fast: "150ms ease-in-out",
    base: "200ms ease-in-out",
    slow: "300ms ease-in-out",
  },
} as const;

export type Theme = typeof theme;
