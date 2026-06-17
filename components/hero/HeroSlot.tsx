"use client";

import { forwardRef } from "react";

type Props = {
  slot: 1 | 2 | 3;
  label: string;
  aura: string;
  gradient: string;
  ring: string;
};

export const HeroSlot = forwardRef<HTMLDivElement, Props>(function HeroSlot(
  { slot, label, aura, gradient, ring },
  ref
) {
  return (
    <div
      ref={ref}
      data-hero-slot={slot}
      className="hero-slot absolute inset-0 grid place-items-center pointer-events-none"
      style={{ opacity: slot === 1 ? 1 : 0 }}
    >
      <div
        className="relative aspect-square w-[min(72vh,72vw)] rounded-[10%] grid place-items-center"
        style={{
          background: gradient,
          boxShadow: `0 0 220px 20px ${aura}, inset 0 0 120px 10px rgba(0,0,0,0.45)`,
          border: `1px solid ${ring}`,
        }}
      >
        <div
          className="absolute inset-[6%] rounded-[8%] border border-cream/10"
          style={{ boxShadow: `inset 0 0 60px ${aura}` }}
        />
        <div
          className="absolute inset-[12%] rounded-[6%]"
          style={{ border: `1px dashed ${ring}` }}
        />
        <div className="absolute inset-x-0 -top-8 flex items-center justify-between px-6 text-xs uppercase tracking-[0.3em] text-cream/60 font-body">
          <span>SLOT // 0{slot}</span>
          <span>{label}</span>
        </div>
        <div className="absolute inset-x-0 -bottom-8 flex items-center justify-between px-6 text-xs uppercase tracking-[0.3em] text-cream/40 font-body">
          <span>3D MODEL</span>
          <span>READY</span>
        </div>

        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full p-[18%] opacity-70"
          aria-hidden
        >
          <defs>
            <linearGradient id={`g-${slot}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F5EFE0" stopOpacity="0.95" />
              <stop offset="1" stopColor="#F5EFE0" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {slot === 1 && (
            <polygon
              points="100,8 188,55 188,145 100,192 12,145 12,55"
              fill="none"
              stroke={`url(#g-${slot})`}
              strokeWidth="1.5"
            />
          )}
          {slot === 2 && (
            <g>
              <circle cx="100" cy="100" r="86" fill="none" stroke={`url(#g-${slot})`} strokeWidth="1.5" />
              <circle cx="100" cy="100" r="60" fill="none" stroke={`url(#g-${slot})`} strokeWidth="1" />
              <line x1="14" y1="100" x2="186" y2="100" stroke={`url(#g-${slot})`} strokeWidth="0.8" />
              <line x1="100" y1="14" x2="100" y2="186" stroke={`url(#g-${slot})`} strokeWidth="0.8" />
            </g>
          )}
          {slot === 3 && (
            <g>
              <path
                d="M100 14 L172 56 L172 144 L100 186 L28 144 L28 56 Z"
                fill="none"
                stroke={`url(#g-${slot})`}
                strokeWidth="1.5"
              />
              <path
                d="M100 50 L140 75 L140 125 L100 150 L60 125 L60 75 Z"
                fill="none"
                stroke={`url(#g-${slot})`}
                strokeWidth="1"
              />
            </g>
          )}
        </svg>

        <div className="font-accent text-cream/60 text-xl tracking-widest rotate-[-8deg]">
          // PLACEHOLDER
        </div>
      </div>
    </div>
  );
});
