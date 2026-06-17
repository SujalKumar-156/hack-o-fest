"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";

const stages = [
  {
    id: "01",
    label: "REGISTRATION OPENS",
    date: "AUG 14",
    color: "#7A3CFF",
    detail: "Lock in your squad. Pick your track. Sharpen your gauntlet.",
  },
  {
    id: "02",
    label: "IDEATION ROUND",
    date: "SEP 03",
    color: "#00E5FF",
    detail: "Submit your one-pager. 100 teams advance.",
  },
  {
    id: "03",
    label: "ROUND 1 · BUILD",
    date: "SEP 12",
    color: "#B4FF39",
    detail: "72 hours. Push to GitHub. Demo on Zoom.",
  },
  {
    id: "04",
    label: "SEMIFINAL · LIVE",
    date: "SEP 22",
    color: "#FFD23F",
    detail: "Top 24 pitch to the council. 8 advance.",
  },
  {
    id: "05",
    label: "FINAL · ON-STAGE",
    date: "OCT 05",
    color: "#FF2D55",
    detail: "Demo day. Crowd. Press. Cash. Tears (good kind).",
  },
];

export function Timeline() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.from(".tl-title, .tl-eyebrow, .tl-blurb", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });

      if (reduced) {
        gsap.set(".tl-node", { opacity: 1, y: 0 });
        gsap.set(".tl-line-fill", { scaleX: 1 });
        return;
      }

      const rail = root.querySelector(".tl-rail") as HTMLElement | null;
      if (!rail) return;

      const moveDistance = () => rail.scrollWidth - window.innerWidth + 320;

      const tween = gsap.to(rail, {
        x: () => -moveDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".tl-stage",
          start: "top top",
          end: () => `+=${moveDistance() + 200}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.fromTo(
        ".tl-line-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".tl-stage",
            start: "top top",
            end: () => `+=${moveDistance() + 200}`,
            scrub: 0.8,
          },
        }
      );

      const nodes = rail.querySelectorAll<HTMLElement>(".tl-node");
      nodes.forEach((n) => {
        gsap.fromTo(
          n.querySelectorAll(".tl-num,.tl-label,.tl-date,.tl-detail"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: n,
              containerAnimation: tween,
              start: "left 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          n.querySelector(".tl-dot"),
          { scale: 0.3, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: n,
              containerAnimation: tween,
              start: "left 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={rootRef} className="relative bg-void overflow-hidden">
      <div className="px-6 md:px-16 pt-32 max-w-[1600px] mx-auto">
        <div className="tl-eyebrow flex items-center gap-4 mb-6 text-cream/60 uppercase tracking-[0.4em] text-xs md:text-sm">
          <span className="w-2 h-2 rounded-full bg-cyan" />
          SECTION // 04 · THE GAUNTLET
        </div>
        <h2 className="tl-title font-display text-[18vw] md:text-[12vw] leading-[0.82] tracking-tight text-cream">
          THE <span className="text-cyan">TIMELINE.</span>
        </h2>
        <p className="tl-blurb mt-6 max-w-2xl text-cream/70 text-lg md:text-xl font-body">
          Five gates. Five chances to advance, fail, learn, and come back stronger.
          The infinity gem moves with you.
        </p>
      </div>

      <div className="tl-stage relative h-screen mt-24">
        <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-cream/10" />
        <div className="absolute top-1/2 left-0 h-[3px] tl-line-fill bg-gradient-to-r from-infinity via-gamma to-crimson origin-left scale-x-0" style={{ width: "100%" }} />

        <div className="tl-rail absolute top-0 left-0 h-full flex items-center gap-[20vw] pl-[12vw] pr-[12vw] will-change-transform">
          {stages.map((s, i) => (
            <div key={s.id} className="tl-node relative flex flex-col items-center gap-6 w-[60vw] md:w-[26vw]">
              <div className="tl-num font-accent text-cream/50 text-2xl tracking-widest">
                NODE {s.id}
              </div>
              <div
                className="tl-dot relative w-24 h-24 rounded-full grid place-items-center"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${s.color}, ${s.color}66)`,
                  boxShadow: `0 0 60px ${s.color}88`,
                }}
              >
                <div className="absolute inset-0 rounded-full border border-cream/40 animate-ping opacity-30" style={{ animationDuration: "2.4s" }} />
                <span className="font-display text-cream text-2xl">{i + 1}</span>
              </div>
              <div className="tl-date font-accent text-3xl md:text-5xl" style={{ color: s.color }}>
                {s.date}
              </div>
              <div className="tl-label font-display text-cream text-2xl md:text-3xl leading-tight tracking-tight text-center">
                {s.label}
              </div>
              <div className="tl-detail text-cream/65 text-sm md:text-base text-center max-w-xs font-body">
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
