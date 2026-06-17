"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { TrackCard } from "./TrackCard";
import { trackColors } from "@/lib/palette";

const tracks = [
  {
    id: "reality",
    name: "REALITY",
    subtitle: "AI · ML · Generative",
    blurb: "Bend the perceptible. Build systems that hallucinate truth.",
    number: "01",
    sponsor: "STARK INDUSTRIES",
  },
  {
    id: "power",
    name: "POWER",
    subtitle: "Web3 · Blockchain · DeFi",
    blurb: "Energy made trustless. Protocols that move planets.",
    number: "02",
    sponsor: "ASGARDIAN LABS",
  },
  {
    id: "mind",
    name: "MIND",
    subtitle: "Dev Tools · DX",
    blurb: "Tools that think with you. Editors that read intent.",
    number: "03",
    sponsor: "WAKANDA OS",
  },
  {
    id: "time",
    name: "TIME",
    subtitle: "Realtime · Streaming",
    blurb: "Latency is a lie. Build for the present tense.",
    number: "04",
    sponsor: "CHRONO CORP",
  },
  {
    id: "space",
    name: "SPACE",
    subtitle: "Open Innovation",
    blurb: "No rules. Build the thing that shouldn't exist yet.",
    number: "05",
    sponsor: "NOVA CORPS",
  },
  {
    id: "soul",
    name: "SOUL",
    subtitle: "Social · Impact · Climate",
    blurb: "Code that costs you something. Build for the world.",
    number: "06",
    sponsor: "FOUNDATION",
  },
] as const;

export function Tracks() {
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const rail = railRef.current;
    if (!root || !rail) return;

    const { gsap, ScrollTrigger } = registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const cards = rail.querySelectorAll<HTMLElement>(".track-card");
      const total = cards.length;
      const moveDistance = () => rail.scrollWidth - window.innerWidth;

      const tween = gsap.to(rail, {
        x: () => -moveDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${moveDistance() + 200}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card) => {
        const trackId = card.dataset.track as keyof typeof trackColors;
        const color = trackColors[trackId];

        // title slam
        const chars = card.querySelectorAll<HTMLElement>(".title .split-char");
        gsap.from(chars, {
          yPercent: 110,
          scale: 2,
          filter: "blur(20px)",
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left center",
            toggleActions: "play none none reverse",
          },
        });

        // halftone wipe
        gsap.fromTo(
          card.querySelector(".halftone-wipe"),
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(150% at 50% 50%)",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left center",
              toggleActions: "play none none reverse",
            },
          }
        );

        // body bg morph
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: tween,
          start: "left 60%",
          end: "right 40%",
          onEnter: () => gsap.to(document.body, { backgroundColor: color.stone, duration: 0.7 }),
          onEnterBack: () => gsap.to(document.body, { backgroundColor: color.stone, duration: 0.7 }),
        });
      });

      // reset bg when leaving the section
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${moveDistance() + 200}`,
        onLeave: () => gsap.to(document.body, { backgroundColor: "#0a0a12", duration: 0.7 }),
        onLeaveBack: () => gsap.to(document.body, { backgroundColor: "#0a0a12", duration: 0.7 }),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tracks" ref={rootRef} className="relative h-screen w-full overflow-hidden">
      {/* fixed spotlight backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.4) 80%)",
          }}
        />
      </div>

      {/* section eyebrow */}
      <div className="absolute top-28 left-0 right-0 flex items-center justify-between px-6 md:px-16 z-10 pointer-events-none">
        <div className="flex items-center gap-4 text-cream uppercase tracking-[0.3em] text-xs md:text-sm">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span>SECTION // 01</span>
          <span className="text-cream/40">·</span>
          <span>SIX STONES</span>
        </div>
        <div className="font-display text-cream/80 text-xs md:text-base tracking-widest hidden md:block">
          SCROLL · HORIZONTAL · SCRUB
        </div>
      </div>

      {/* huge section title */}
      <div className="absolute bottom-10 left-6 md:left-16 z-10 pointer-events-none">
        <div className="font-display text-[26vw] md:text-[18vw] leading-[0.8] text-cream/10 tracking-tighter">
          TRACKS
        </div>
      </div>

      <div ref={railRef} className="absolute top-0 left-0 h-full flex items-center pl-[8vw] pr-[8vw] gap-6 md:gap-10 will-change-transform">
        {tracks.map((t) => (
          <TrackCard key={t.id} {...t} />
        ))}
      </div>
    </section>
  );
}
