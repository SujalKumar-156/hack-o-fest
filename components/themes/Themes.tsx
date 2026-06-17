"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { ComicBurst } from "@/components/ui/ComicBurst";

const themes = [
  {
    title: "TIME COLLAPSE",
    body: "Build interfaces that exist outside time. Realtime collaboration, infinite undo, presence.",
    accent: "#7A3CFF",
    glyph: "∞",
  },
  {
    title: "AGENTS UNCHAINED",
    body: "Multi-agent systems doing useful, scary, hilarious things in the real world.",
    accent: "#B4FF39",
    glyph: "◈",
  },
  {
    title: "OFF-WORLD UX",
    body: "Spatial interfaces, voice-first products, ambient computing for the next platform.",
    accent: "#00E5FF",
    glyph: "◉",
  },
  {
    title: "TINY GIANTS",
    body: "Local-first, edge-rendered, sub-100ms — software that respects the user's machine.",
    accent: "#FF2D55",
    glyph: "▲",
  },
  {
    title: "CULTURE STACK",
    body: "Music, video, fashion, food. Builders making tools for taste-makers.",
    accent: "#FFD23F",
    glyph: "✦",
  },
  {
    title: "WILD CARD",
    body: "Anything. Make us laugh. Make us cry. Make us nervous.",
    accent: "#F5EFE0",
    glyph: "✺",
  },
];

export function Themes() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tiles = root.querySelectorAll<HTMLElement>(".theme-tile");
      if (reduced) {
        gsap.set(tiles, { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".big-title .split-word", {
        yPercent: 110,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });

      tiles.forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { y: 80, opacity: 0, rotateZ: i % 2 ? 4 : -4 },
          {
            y: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: {
              trigger: tile,
              start: "top 88%",
            },
          }
        );

        const ink = tile.querySelector(".ink-mask") as HTMLElement | null;
        if (ink) {
          gsap.fromTo(
            ink,
            { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
            {
              clipPath:
                "polygon(0 0, 100% 0, 100% 0, 100% 0, 100% 100%, 0 100%)",
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: tile, start: "top 80%" },
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="themes" ref={rootRef} className="relative bg-cream text-ink py-32 md:py-48 overflow-hidden">
      <div className="halftone absolute inset-0 opacity-40 pointer-events-none" />
      <div className="absolute top-20 right-10 hidden md:block opacity-90">
        <ComicBurst size={220} color="#FF2D55" text="WHAM!" spikes={16} />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative">
        <div className="flex items-baseline gap-6 mb-10 md:mb-16">
          <span className="font-display text-ink/60 text-sm md:text-base uppercase tracking-[0.4em]">
            SECTION // 02
          </span>
          <span className="h-px flex-1 bg-ink/20" />
          <span className="font-accent text-3xl md:text-5xl text-crimson tracking-wider">
            CHOOSE ONE
          </span>
        </div>

        <h2 className="big-title font-display text-[18vw] md:text-[12vw] leading-[0.82] tracking-tight max-w-5xl">
          <span className="split-word inline-block overflow-hidden">THEMES</span>{" "}
          <span className="split-word inline-block overflow-hidden text-crimson">THAT</span>{" "}
          <span className="split-word inline-block overflow-hidden">PUNCH.</span>
        </h2>
        <p className="mt-8 max-w-2xl text-ink/70 text-lg md:text-xl font-body">
          Pick a lens. Build through it. Six creative constraints designed to
          smash defaults and force a point of view.
        </p>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {themes.map((t, i) => (
            <article
              key={t.title}
              className="theme-tile relative aspect-[4/5] rounded-3xl overflow-hidden p-6 md:p-8 flex flex-col justify-between"
              style={{
                background: `linear-gradient(160deg, ${t.accent}22 0%, ${t.accent}66 100%)`,
                border: `1px solid ${t.accent}55`,
              }}
            >
              <div className="ink-mask absolute inset-0 bg-ink/95 pointer-events-none" />
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-accent text-cream text-3xl md:text-4xl tracking-widest">
                  0{i + 1}
                </span>
                <span className="text-cream/80 font-display text-5xl md:text-7xl leading-none">
                  {t.glyph}
                </span>
              </div>
              <div className="relative z-10">
                <h3
                  className="font-display text-[10vw] md:text-[3.4vw] leading-[0.85] tracking-tight"
                  style={{ color: t.accent }}
                >
                  {t.title}
                </h3>
                <p className="mt-4 text-cream/80 text-sm md:text-base font-body max-w-xs">
                  {t.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
