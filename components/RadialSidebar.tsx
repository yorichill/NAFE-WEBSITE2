"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const NAV = [
  { key: "home", label: "Home", icon: "◉", sub: [{ label: "Accueil", href: "/" }] },
  {
    key: "teams",
    label: "Teams",
    icon: "▣",
    sub: [
      { label: "Valorant", href: "/teams/valorant" },
      { label: "League of Legends", href: "/teams/lol" },
      { label: "CS2", href: "/teams/cs2" },
    ],
  },
  { key: "live", label: "Live", icon: "▶", sub: [{ label: "Stream", href: "/" }] },
  {
    key: "club",
    label: "Club",
    icon: "✦",
    sub: [{ label: "Dashboard", href: "/club/dashboard" }],
  },
  { key: "shop", label: "Shop", icon: "⊞", sub: [{ label: "Bientôt", href: "/" }] },
];

export function RadialSidebar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 z-40 flex flex-col items-center py-24 gap-6 bg-nafe-night/60 backdrop-blur-2xl border-r border-white/5">
      {NAV.map((item) => (
        <div
          key={item.key}
          onMouseEnter={() => setActive(item.key)}
          onMouseLeave={() => setActive(null)}
          className="relative"
        >
          <button
            className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-nafe-blue transition-colors text-lg"
            aria-label={item.label}
          >
            {item.icon}
          </button>

          <AnimatePresence>
            {active === item.key && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-14 top-0 flex flex-col gap-2 bg-nafe-surface/95 backdrop-blur-xl border border-white/5 px-5 py-4 min-w-[180px] nafe-clip-card shadow-nafe-glow"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-nafe-blue">
                  {item.label}
                </span>
                {item.sub.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-sm text-white/80 hover:text-nafe-blue transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </aside>
  );
}
