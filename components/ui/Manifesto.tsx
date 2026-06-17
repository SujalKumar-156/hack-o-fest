"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";

const lines = [
  { label: "Manifesto", text: "We make hackathons feel like origin stories." },
  { label: "Belief", text: "Code can be cinema. Latency is a creative choice." },
  { label: "Promise", text: "You will leave with a portfolio piece, a team, and bruises." },
];

export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const phrases = root.querySelectorAll<HTMLElement>(".manifesto-line");
      phrases.forEach((p) => {
        const chars = p.querySelectorAll<HTMLElement>(".split-char");
        gsap.fromTo(
          chars,
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.015,
            ease: "none",
            scrollTrigger: {
              trigger: p,
              start: "top 75%",
              end: "top 35%",
              scrub: 0.8,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-cream text-ink py-32 md:py-48 overflow-hidden">
      <div className="halftone absolute inset-0 opacity-30 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 relative">
        <div className="mb-20 flex items-center gap-4 uppercase tracking-[0.4em] text-xs md:text-sm text-ink/60">
          <span className="w-2 h-2 rounded-full bg-crimson" />
          MANIFESTO // WHY WE BUILD
        </div>

        {lines.map((l, i) => (
          <div key={l.label} className="manifesto-line grid grid-cols-12 gap-6 mb-16 md:mb-28">
            <div className="col-span-2 md:col-span-2 pt-3 text-ink/50 font-accent text-lg md:text-2xl tracking-widest">
              0{i + 1}
            </div>
            <div className="col-span-10 md:col-span-10 font-display text-[8vw] md:text-[5vw] leading-[0.95] tracking-tight">
              {Array.from(l.text).map((c, k) => (
                <span key={k} className="split-char">
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
