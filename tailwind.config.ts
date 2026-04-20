import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "nafe-blue": {
          DEFAULT: "#1E4FD8",
          50: "#E8F0FF",
          400: "#5A82EC",
          600: "#1740B8",
          900: "#0B1F5C",
        },
        "nafe-ice": "#E8F0FF",
        "nafe-ink": "#0A0A0A",
        "steel-grey": "#6B7280",
        "nafe-night": "#050814",
        "nafe-surface": "#0F1729",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "nafe-glow": "0 0 40px rgba(30, 79, 216, 0.35)",
        "nafe-glow-lg": "0 0 80px -10px rgba(30, 79, 216, 0.55)",
        "nafe-card": "0 0 60px -10px rgba(30, 79, 216, 0.45)",
      },
      backgroundImage: {
        "nafe-gradient":
          "linear-gradient(135deg, #1E4FD8 0%, #0B1F5C 100%)",
        "scan-line":
          "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(30,79,216,0.03) 3px)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 12px #1E4FD8" },
          "50%": { boxShadow: "0 0 24px #1E4FD8" },
        },
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "ticker": "ticker 40s linear infinite",
      },
      letterSpacing: {
        "widest-2": "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
