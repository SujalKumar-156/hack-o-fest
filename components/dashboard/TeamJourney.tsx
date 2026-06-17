"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import type { Team } from "@/lib/teamsApi";
import { stageLabel } from "@/lib/teamsApi";

export function TeamJourney({ team }: { team: Team }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.from(".team-name, .team-meta, .team-blurb", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });

      if (reduced) {
        gsap.set(".journey-node", { opacity: 1, y: 0 });
        gsap.set(".journey-line-fill", { scaleY: 1 });
        return;
      }

      const nodes = root.querySelectorAll<HTMLElement>(".journey-node");
      nodes.forEach((n) => {
        gsap.from(n, {
          y: 80,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: n, start: "top 80%" },
        });

        const shield = n.querySelector(".shield-svg path");
        if (shield) {
          gsap.fromTo(
            shield,
            { strokeDashoffset: 600 },
            {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power2.out",
              scrollTrigger: { trigger: n, start: "top 75%" },
            }
          );
        }
      });

      gsap.fromTo(
        ".journey-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-rail",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      gsap.to(".member-card", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".members-grid", start: "top 80%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const currentIdx = team.stage_history.findIndex(
    (s) => s.stage === team.current_stage
  );
  const passed = team.stage_history.filter((s) => s.status === "passed").length;
  const total = team.stage_history.length;
  const isFailed = team.stage_history.some((s) => s.status === "failed");

  return (
    <div ref={rootRef}>
      {/* hero header */}
      <section className="relative pt-44 pb-20 px-6 md:px-16 max-w-[1600px] mx-auto">
        <div className="team-meta flex items-center gap-4 mb-6 text-cream/60 uppercase tracking-[0.4em] text-xs md:text-sm">
          <span className="w-2 h-2 rounded-full bg-gold" />
          DASHBOARD · ID {team.id}
        </div>
        <h1 className="team-name font-display text-[18vw] md:text-[12vw] leading-[0.82] tracking-tight text-cream">
          {team.name}
        </h1>

        <div className="team-blurb mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {[
            { k: "TRACK", v: team.track.toUpperCase() },
            { k: "STAGE", v: stageLabel(team.current_stage) },
            { k: "SCORE", v: team.score != null ? String(team.score) : "—" },
            {
              k: "PROGRESS",
              v: `${passed}/${total}`,
            },
          ].map((m) => (
            <div key={m.k}>
              <div className="font-accent text-gold text-sm md:text-base tracking-widest">
                {m.k}
              </div>
              <div className="font-display text-cream text-3xl md:text-5xl leading-none mt-1 tracking-tight">
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* vertical scrubbed journey */}
      <section className="relative px-6 md:px-16 max-w-[1600px] mx-auto pb-32">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-display text-cream text-4xl md:text-7xl leading-none tracking-tight">
            THE JOURNEY.
          </h2>
          <span className="font-accent text-cream/60 text-xl md:text-3xl tracking-widest">
            STAGE-BY-STAGE
          </span>
        </div>

        <div className="journey-rail relative pl-20 md:pl-40">
          {/* spine */}
          <div
            className="absolute left-8 md:left-20 top-0 bottom-0 w-[3px] bg-cream/15"
            aria-hidden
          />
          <div
            className="journey-line-fill absolute left-8 md:left-20 top-0 bottom-0 w-[3px] origin-top bg-gradient-to-b from-infinity via-gamma to-gold"
            aria-hidden
            style={{ transformOrigin: "top" }}
          />

          {team.stage_history.map((s, i) => {
            const isCurrent = i === currentIdx && !isFailed;
            const isPassed = s.status === "passed";
            const isFail = s.status === "failed";
            const stoneColor = isPassed
              ? "#B4FF39"
              : isFail
              ? "#FF2D55"
              : isCurrent
              ? "#FFD23F"
              : "#F5EFE040";

            return (
              <div
                key={s.stage}
                className="journey-node relative grid grid-cols-12 gap-6 md:gap-10 py-10 md:py-16"
              >
                {/* dot */}
                <div
                  className="absolute -left-12 md:-left-24 top-12 md:top-16 w-24 h-24 md:w-32 md:h-32 grid place-items-center"
                  style={{
                    filter: isCurrent
                      ? "drop-shadow(0 0 32px #FFD23F)"
                      : isPassed
                      ? "drop-shadow(0 0 24px #B4FF39)"
                      : isFail
                      ? "drop-shadow(0 0 24px #FF2D55)"
                      : "none",
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="shield-svg w-full h-full"
                  >
                    <path
                      d="M50 6 L92 28 L86 70 L50 96 L14 70 L8 28 Z"
                      fill={isPassed ? `${stoneColor}22` : "transparent"}
                      stroke={stoneColor}
                      strokeWidth="3"
                      strokeDasharray="600"
                      strokeDashoffset="0"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    className={`absolute font-accent text-2xl md:text-3xl tracking-widest ${
                      isPassed || isFail
                        ? "text-ink"
                        : "text-cream"
                    }`}
                    style={{ color: isFail ? "#fff" : undefined }}
                  >
                    0{i + 1}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-8">
                  <div
                    className="font-accent text-base md:text-lg tracking-widest"
                    style={{ color: stoneColor }}
                  >
                    {isPassed
                      ? "PASSED"
                      : isFail
                      ? "ELIMINATED"
                      : isCurrent
                      ? "IN PROGRESS"
                      : "LOCKED"}
                  </div>
                  <div className="font-display text-cream text-4xl md:text-7xl leading-[0.85] tracking-tight mt-2">
                    {stageLabel(s.stage)}
                  </div>
                  <div className="mt-3 font-body text-cream/65 text-sm md:text-base">
                    {s.at}
                  </div>
                  {isCurrent && (
                    <p className="mt-5 text-cream/70 text-base md:text-lg max-w-2xl font-body">
                      You&apos;re in the spotlight. Submit your build, hold the
                      line, ship the demo. The council watches.
                    </p>
                  )}
                </div>

                <div className="col-span-12 md:col-span-4 flex md:justify-end items-start mt-4 md:mt-0">
                  <div
                    className={`px-5 py-3 rounded-full border-2 font-accent tracking-widest text-base ${
                      isPassed
                        ? "border-gamma text-gamma"
                        : isFail
                        ? "border-crimson text-crimson"
                        : isCurrent
                        ? "border-gold text-gold animate-pulse"
                        : "border-cream/20 text-cream/40"
                    }`}
                  >
                    {isPassed
                      ? "STAGE CLEARED"
                      : isFail
                      ? "RUN ENDED"
                      : isCurrent
                      ? "ACTIVE"
                      : "ROUND LOCKED"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* members */}
      <section className="relative px-6 md:px-16 max-w-[1600px] mx-auto pb-32">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-display text-cream text-4xl md:text-7xl leading-none tracking-tight">
            THE SQUAD.
          </h2>
          <span className="font-accent text-cream/60 text-xl md:text-3xl tracking-widest">
            {team.members.length} ASSEMBLED
          </span>
        </div>
        <div className="members-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {team.members.map((m, i) => (
            <div
              key={`${m.name}-${i}`}
              className="member-card relative p-6 md:p-8 rounded-3xl border border-cream/15 bg-ink/40 backdrop-blur-sm flex items-center gap-6"
              style={{ opacity: 0, transform: "translateY(40px)" }}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 shield-clip grid place-items-center font-display text-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #FFD23F, #7A3CFF)",
                  color: "#0a0a12",
                }}
              >
                {m.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="font-display text-cream text-2xl md:text-4xl leading-none tracking-tight">
                  {m.name}
                </div>
                <div className="font-accent text-gold text-base md:text-xl tracking-widest mt-2">
                  {m.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
