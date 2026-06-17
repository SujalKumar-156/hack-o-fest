"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";

const podium = [
  {
    place: "FIRST",
    rank: "01",
    amount: "$20,000",
    height: "h-[78%]",
    color: "#FFD23F",
    text: "text-ink",
    perks: ["Cash prize", "Y Combinator office hours", "Mentorship × 6 months"],
  },
  {
    place: "SECOND",
    rank: "02",
    amount: "$12,000",
    height: "h-[60%]",
    color: "#B4FF39",
    text: "text-ink",
    perks: ["Cash prize", "AWS credits", "Devpost feature"],
  },
  {
    place: "THIRD",
    rank: "03",
    amount: "$6,000",
    height: "h-[44%]",
    color: "#FF2D55",
    text: "text-cream",
    perks: ["Cash prize", "Cloud credits", "Swag dump"],
  },
];

const trackPrizes = [
  { name: "Best in Reality", amount: "$3,000" },
  { name: "Best in Power", amount: "$3,000" },
  { name: "Best in Mind", amount: "$3,000" },
  { name: "Best in Time", amount: "$3,000" },
  { name: "Best in Space", amount: "$3,000" },
  { name: "Best in Soul", amount: "$3,000" },
];

export function Prizes() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.from(".prize-eyebrow,.prize-title,.prize-blurb", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });

      const pillars = root.querySelectorAll<HTMLElement>(".pillar");
      if (reduced) {
        pillars.forEach((p) => gsap.set(p, { clipPath: "inset(0 0 0 0)" }));
        return;
      }
      pillars.forEach((p, i) => {
        gsap.fromTo(
          p,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.4 + i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".podium-stage",
              start: "top 70%",
              end: "top 20%",
              scrub: 0.6,
            },
          }
        );
      });

      gsap.fromTo(
        ".trophy-svg path",
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: ".podium-stage", start: "top 60%" },
        }
      );

      gsap.from(".track-prize", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".track-prize-grid", start: "top 80%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="prizes" ref={rootRef} className="relative bg-void py-32 md:py-48 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(255,210,63,0.12) 0%, transparent 50%)",
        }}
      />
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative">
        <div className="prize-eyebrow flex items-center gap-4 mb-6 text-cream/60 uppercase tracking-[0.4em] text-xs md:text-sm">
          <span className="w-2 h-2 rounded-full bg-gold" />
          SECTION // 03 · THE LOOT
        </div>
        <h2 className="prize-title font-display text-[18vw] md:text-[12vw] leading-[0.82] tracking-tight text-cream">
          <span>PRIZES</span>
          <span className="block text-gold">$50K POOL.</span>
        </h2>
        <p className="prize-blurb mt-6 max-w-2xl text-cream/70 text-lg md:text-xl font-body">
          One overall winner. Six track winners. A pool of secondary prizes, swag,
          and credits worth more than your tuition.
        </p>

        {/* podium */}
        <div className="podium-stage relative mt-20 md:mt-32 grid grid-cols-3 gap-4 md:gap-10 items-end h-[480px] md:h-[640px]">
          {/* trophy */}
          <svg
            className="trophy-svg absolute left-1/2 -translate-x-1/2 -top-16 w-24 md:w-40"
            viewBox="0 0 100 120"
            fill="none"
          >
            <path
              d="M20 10 H80 V40 C80 60 70 70 50 72 C30 70 20 60 20 40 Z"
              stroke="#FFD23F"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
            <path
              d="M50 72 V90 M30 90 H70 M28 100 H72 V112 H28 Z"
              stroke="#FFD23F"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
            <path
              d="M20 18 C10 18 4 28 10 38 C14 44 18 46 22 46"
              stroke="#FFD23F"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
            <path
              d="M80 18 C90 18 96 28 90 38 C86 44 82 46 78 46"
              stroke="#FFD23F"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
          </svg>

          {[podium[1], podium[0], podium[2]].map((p) => (
            <div
              key={p.place}
              className={`pillar relative ${p.height} rounded-t-3xl overflow-hidden border border-cream/10 flex flex-col`}
              style={{
                background: `linear-gradient(180deg, ${p.color} 0%, ${p.color}AA 60%, ${p.color}88 100%)`,
                boxShadow: `0 -40px 100px -20px ${p.color}55`,
              }}
            >
              <div className={`p-5 md:p-8 ${p.text}`}>
                <div className="font-accent text-2xl md:text-4xl tracking-widest">
                  #{p.rank}
                </div>
                <div className="font-display text-4xl md:text-7xl leading-[0.82] tracking-tight mt-2">
                  {p.place}
                </div>
              </div>
              <div className={`mt-auto p-5 md:p-8 ${p.text}`}>
                <div className="font-display text-3xl md:text-6xl leading-none">
                  {p.amount}
                </div>
                <ul className={`mt-3 space-y-1 text-xs md:text-sm font-body ${p.text === "text-ink" ? "text-ink/80" : "text-cream/80"}`}>
                  {p.perks.map((perk) => (
                    <li key={perk}>· {perk}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* track prizes */}
        <div className="mt-32">
          <div className="flex items-baseline justify-between gap-6 mb-10">
            <h3 className="font-display text-cream text-4xl md:text-6xl leading-none tracking-tight">
              SIX TRACKS. SIX WINNERS.
            </h3>
            <span className="font-accent text-gamma text-2xl md:text-4xl">$3K EACH</span>
          </div>
          <div className="track-prize-grid grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {trackPrizes.map((tp) => (
              <div
                key={tp.name}
                className="track-prize relative p-6 md:p-8 rounded-2xl border border-cream/15 bg-ink/40 backdrop-blur-sm flex items-center justify-between"
              >
                <span className="font-display text-cream text-xl md:text-2xl tracking-wide">
                  {tp.name}
                </span>
                <span className="font-accent text-gold text-2xl md:text-3xl">
                  {tp.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
