"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { HeroSlot } from "./HeroSlot";
import { Particles } from "./Particles";
import { ScrollCue } from "./ScrollCue";
import { ComicBurst } from "@/components/ui/ComicBurst";
import { splitChars } from "@/fx/util";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap, ScrollTrigger } = registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // initial entry: hero-1 chars slam in
      const chars = root.querySelectorAll<HTMLElement>(".h1 .split-char");
      gsap.from(chars, {
        yPercent: 110,
        rotateZ: 8,
        duration: 1.1,
        ease: "power4.out",
        stagger: { each: 0.04, from: "random" },
        delay: 0.4,
      });

      gsap.from(root.querySelectorAll(".eyebrow,.tagline,.cta,.meta"), {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.9,
      });

      if (reduced) {
        // simple stage cycling — fade only
        gsap.set(root.querySelector('[data-hero-slot="1"]'), { opacity: 1 });
        gsap.set(root.querySelector('[data-hero-slot="2"]'), { opacity: 0 });
        gsap.set(root.querySelector('[data-hero-slot="3"]'), { opacity: 0 });
        return;
      }

      // cinematic scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // body background color morph for the whole hero
      tl.to(
        document.body,
        { backgroundColor: "#0a0a12", duration: 0.001 },
        0
      );

      // hero-1 → hero-2 ----------------------------------
      tl.to(
        '[data-hero-slot="1"]',
        { scale: 0.92, opacity: 0, filter: "blur(8px)", duration: 0.5 },
        0.1
      )
        .to('[data-hero-slot="2"]', { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0.15)
        .to('[data-hero-slot="2"]', { xPercent: -10, rotation: -6, duration: 1 }, 0.2)
        .to(
          document.body,
          { backgroundColor: "#1a0d3a", duration: 0.6 },
          0.15
        )
        .to(".h1", { opacity: 0, y: -60, duration: 0.4 }, 0.15)
        .to(".tagline", { opacity: 0, y: -40, duration: 0.4 }, 0.15)
        .fromTo(
          ".h2",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.35
        )
        .fromTo(
          ".tagline-2 .split-char",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.5, stagger: { each: 0.02, from: "start" }, ease: "power3.out" },
          0.45
        )
        .fromTo(".burst-2", { scale: 0, rotation: -45, opacity: 0 }, { scale: 1.1, rotation: 12, opacity: 1, duration: 0.4 }, 0.4)
        .to(".scroll-cue", { opacity: 0, duration: 0.2 }, 0.1);

      // hero-2 → hero-3 ----------------------------------
      tl.to(
        '[data-hero-slot="2"]',
        { scale: 1.2, opacity: 0, filter: "blur(10px)", duration: 0.5 },
        1.2
      )
        .to('[data-hero-slot="3"]', { opacity: 1, scale: 1, duration: 0.5 }, 1.25)
        .to('[data-hero-slot="3"]', { scale: 1.18, duration: 0.6 }, 1.4)
        .to(document.body, { backgroundColor: "#3a0a18", duration: 0.6 }, 1.25)
        .to(".h2", { opacity: 0, y: -60, duration: 0.4 }, 1.2)
        .to(".burst-2", { opacity: 0, scale: 0.6, duration: 0.3 }, 1.2)
        .fromTo(
          ".h3 .split-char",
          { yPercent: 110, scale: 1.6, filter: "blur(12px)" },
          {
            yPercent: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: { each: 0.03, from: "start" },
            ease: "power3.out",
          },
          1.35
        )
        .fromTo(".cta-3", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 1.6)
        .to(document.body, { backgroundColor: "#0a0a12", duration: 0.4 }, 2.4);

      // hero ring rotations -------------------------------
      gsap.to(".ring-pulse", {
        rotate: 360,
        duration: 32,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".ring-pulse-rev", {
        rotate: -360,
        duration: 48,
        repeat: -1,
        ease: "none",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const tag1 = splitChars("ENTER  THE  HACKATHON  THAT  REWRITES  REALITY");
  const tag3 = splitChars("ENTER THE MULTIVERSE");

  return (
    <section
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden bg-void"
    >
      {/* radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 35%, rgba(10,10,18,0.85) 80%, #0a0a12 100%)",
        }}
      />
      <Particles count={70} color="#FFD23F" className="opacity-60" />
      <Particles count={40} color="#7A3CFF" className="opacity-40" />

      {/* concentric rings */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="ring-pulse w-[120vmin] h-[120vmin] rounded-full border border-cream/5" />
      </div>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="ring-pulse-rev w-[160vmin] h-[160vmin] rounded-full border border-cream/[0.04] border-dashed" />
      </div>

      {/* slots */}
      <HeroSlot
        slot={1}
        label="VOID"
        aura="rgba(255,210,63,0.22)"
        gradient="radial-gradient(circle at 35% 30%, #2a2540 0%, #0e0a1f 60%, #060410 100%)"
        ring="#FFD23F55"
      />
      <HeroSlot
        slot={2}
        label="INFINITY"
        aura="rgba(122,60,255,0.35)"
        gradient="radial-gradient(circle at 60% 40%, #5a2bd0 0%, #2b1075 50%, #0a0428 100%)"
        ring="#7A3CFF66"
      />
      <HeroSlot
        slot={3}
        label="MULTIVERSE"
        aura="rgba(255,45,85,0.42)"
        gradient="radial-gradient(circle at 50% 50%, #ff5a7f 0%, #b8123c 40%, #380914 100%)"
        ring="#FFD23F88"
      />

      {/* top hud */}
      <div className="absolute top-28 left-0 right-0 flex justify-between px-6 md:px-12 text-xs md:text-sm uppercase tracking-[0.3em] text-cream/60 pointer-events-none">
        <div className="eyebrow flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-crimson" />
          <span>EVENT // 2026</span>
        </div>
        <div className="meta hidden md:flex items-center gap-3">
          <span>72 HOURS</span>
          <span>·</span>
          <span>$50K POOL</span>
          <span>·</span>
          <span>∞ POSSIBILITIES</span>
        </div>
      </div>

      {/* hero-1 text */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center px-6">
          <div className="h1 font-display leading-[0.82] tracking-tight text-cream relative">
            <div className="text-[18vw] md:text-[16vw]">
              {Array.from("ASSEMBLE").map((c, i) => (
                <span key={i} className="split-word">
                  <span className="split-char">{c}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="tagline mt-6 md:mt-10 text-cream/70 font-body text-sm md:text-base uppercase tracking-[0.4em]">
            72 hours · 6 tracks · one multiverse of code
          </div>
        </div>
      </div>

      {/* hero-2 text */}
      <div className="absolute inset-0 grid grid-cols-12 items-center px-6 md:px-16 pointer-events-none">
        <div className="col-span-12 md:col-span-6 md:col-start-7 relative">
          <div className="h2 font-display leading-[0.85] text-cream text-[13vw] md:text-[8vw]" style={{ opacity: 0 }}>
            <span>INFINITY</span>
            <br />
            <span className="text-gamma">STONES.</span>
            <br />
            <span className="text-gold">SIX TRACKS.</span>
          </div>
          <div className="tagline-2 mt-8 max-w-md text-cream/80 text-base md:text-lg font-body">
            {tag1.map((w, wi) => (
              <span key={wi} className="split-word">
                {w.chars.map((ch, ci) => (
                  <span key={ci} className="split-char">{ch}</span>
                ))}
                {wi < tag1.length - 1 && " "}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden md:block absolute top-1/2 left-[14%] -translate-y-1/2 burst-2" style={{ opacity: 0 }}>
          <ComicBurst size={320} color="#FFD23F" text="POW!" spikes={20} />
        </div>
      </div>

      {/* hero-3 text */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center px-6">
          <div className="h3 font-display leading-[0.85] text-cream text-[14vw] md:text-[12vw]">
            {tag3.map((w, wi) => (
              <span key={wi} className="split-word inline-block mr-[0.25em]">
                {w.chars.map((ch, ci) => (
                  <span key={ci} className="split-char">{ch}</span>
                ))}
              </span>
            ))}
          </div>
          <div className="cta-3 mt-10 inline-flex items-center gap-4" style={{ opacity: 0 }}>
            <a
              href="/id-card"
              className="group relative inline-flex items-center gap-3 px-8 py-5 rounded-full bg-gold text-ink font-display tracking-widest text-2xl"
              data-magnetic
            >
              <span>GET YOUR ID</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#tracks"
              className="text-cream/80 hover:text-cream font-body uppercase tracking-[0.3em] text-sm"
              data-magnetic
            >
              View tracks
            </a>
          </div>
        </div>
      </div>

      <div className="cta absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-auto">
        <a
          href="/id-card"
          className="group relative inline-flex items-center gap-3 px-8 py-5 rounded-full bg-crimson text-cream font-display tracking-widest text-xl shadow-glow-crimson"
          data-magnetic
        >
          <span>JOIN THE INITIATIVE</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>

      <div className="scroll-cue">
        <ScrollCue />
      </div>

      {/* corner ornaments */}
      <div className="absolute bottom-6 left-6 text-cream/40 text-xs uppercase tracking-[0.3em] font-body">
        N · 28.6° / E · 77.2°
      </div>
      <div className="absolute bottom-6 right-6 text-cream/40 text-xs uppercase tracking-[0.3em] font-body">
        REC // 00:00:01
      </div>
    </section>
  );
}
