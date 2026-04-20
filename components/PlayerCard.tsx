"use client";

import { motion } from "framer-motion";

type PlayerCardProps = {
  name: string;
  tag: string;
  role: string;
  jersey: number;
  kd: number;
  avatar: string;
};

export function PlayerCard({
  name,
  tag,
  role,
  jersey,
  kd,
  avatar,
}: PlayerCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="group relative overflow-hidden bg-white dark:bg-nafe-surface
                 border border-nafe-ink/10 dark:border-white/5
                 nafe-clip-card
                 p-6 w-full cursor-pointer
                 hover:shadow-nafe-card transition-shadow duration-500"
    >
      <span
        aria-hidden
        className="absolute -right-4 -top-8 font-display font-black
                   text-[11rem] leading-none text-nafe-blue/[0.08]
                   dark:text-nafe-blue/15 select-none pointer-events-none"
      >
        {String(jersey).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <span className="text-[11px] uppercase tracking-[0.25em] text-steel-grey font-mono">
            {role}
          </span>
          <div className="h-2 w-2 rounded-full bg-nafe-blue animate-pulse-glow" />
        </div>

        <img
          src={avatar}
          alt={name}
          className="h-40 w-40 object-cover grayscale
                     group-hover:grayscale-0 transition-all duration-700
                     nafe-clip-avatar bg-nafe-blue/10"
        />

        <div>
          <h3 className="font-display text-3xl font-black tracking-tighter text-nafe-ink dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-steel-grey font-mono">@{tag}</p>
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-nafe-ink/10 dark:border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-steel-grey">
              K/D Ratio
            </span>
            <p className="font-mono text-2xl font-bold text-nafe-blue">
              {kd.toFixed(2)}
            </p>
          </div>
          <button className="text-xs uppercase tracking-wider font-bold text-nafe-ink dark:text-white group-hover:text-nafe-blue transition-colors">
            Voir profil →
          </button>
        </div>
      </div>
    </motion.article>
  );
}
