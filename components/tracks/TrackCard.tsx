"use client";

import { trackColors } from "@/lib/palette";

type Props = {
  id: keyof typeof trackColors;
  name: string;
  subtitle: string;
  blurb: string;
  number: string;
  sponsor: string;
};

export function TrackCard({ id, name, subtitle, blurb, number, sponsor }: Props) {
  const color = trackColors[id];

  return (
    <div
      data-track={id}
      className="track-card relative shrink-0 w-[78vw] md:w-[44vw] h-[72vh] rounded-[28px] overflow-hidden grid grid-rows-[auto_1fr_auto]"
      style={{
        background: `linear-gradient(160deg, ${color.stone}, ${color.stone}CC 50%, ${color.stone}88)`,
        color: color.ink,
        boxShadow: `0 60px 120px -40px ${color.aura}`,
      }}
    >
      {/* halftone reveal */}
      <div
        className="halftone-wipe absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(20,20,28,0.18) 1.2px, transparent 1.6px)",
          backgroundSize: "10px 10px",
          clipPath: "circle(0% at 50% 50%)",
        }}
      />
      {/* large stone */}
      <div
        aria-hidden
        className="absolute -top-[10%] -right-[20%] w-[70%] aspect-square rounded-full opacity-90 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color.stone === "#FFD23F" ? "#fff7c2" : "#ffffff70"} 0%, ${color.stone} 35%, ${color.stone}80 70%, transparent 100%)`,
          filter: "blur(10px)",
        }}
      />

      <header className="relative z-10 p-6 md:p-10 flex items-start justify-between">
        <span className="font-accent text-3xl md:text-5xl tracking-widest opacity-80">
          #{number}
        </span>
        <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] opacity-75">
          {sponsor}
        </span>
      </header>

      <div className="relative z-10 px-6 md:px-10 self-end">
        <h3 className="title font-display leading-[0.82] tracking-tight text-[15vw] md:text-[7vw]">
          {Array.from(name).map((c, i) => (
            <span key={i} className="split-word">
              <span className="split-char">{c}</span>
            </span>
          ))}
        </h3>
        <div className="mt-3 md:mt-5 font-accent text-2xl md:text-4xl tracking-wider opacity-90">
          {subtitle}
        </div>
      </div>

      <footer className="relative z-10 p-6 md:p-10 flex items-end justify-between gap-6">
        <p className="max-w-xs text-sm md:text-base opacity-85 font-body leading-snug">
          {blurb}
        </p>
        <div className="font-body text-xs uppercase tracking-[0.3em] opacity-70 hidden md:block">
          Explore →
        </div>
      </footer>
    </div>
  );
}
