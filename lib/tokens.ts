export const tokens = {
  color: {
    brand: "#1E4FD8",
    brandIce: "#E8F0FF",
    ink: "#0A0A0A",
    white: "#FFFFFF",
    grey: "#6B7280",
    night: "#050814",
    surface: "#0F1729",
  },
  radius: {
    none: "0",
    sm: "2px",
    md: "6px",
    lg: "12px",
  },
  clip: {
    card: "polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%)",
    avatar: "polygon(0 0, 100% 0, 100% 100%, 8% 100%)",
    pill: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
  },
  motion: {
    spring: { type: "spring", stiffness: 260, damping: 20 },
    wipe: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  typography: {
    display: "font-display font-black tracking-tighter",
    eyebrow: "text-[11px] uppercase tracking-[0.25em] font-mono",
    stat: "font-mono font-bold text-nafe-blue",
  },
} as const;

export type Tokens = typeof tokens;
