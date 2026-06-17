"use client";

import { useEffect, useRef, useState } from "react";
import { registerGsap } from "@/lib/gsap";

export function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const counter = counterRef.current;
    if (!root || !counter) return;
    const { gsap } = registerGsap();

    const state = { v: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setDone(true);
        document.body.style.overflow = "";
      },
    });

    document.body.style.overflow = "hidden";

    tl.to(state, {
      v: 100,
      duration: 1.8,
      ease: "power1.inOut",
      onUpdate: () => {
        counter.textContent = String(Math.round(state.v)).padStart(3, "0");
      },
    })
      .to(
        root.querySelector(".bar"),
        { scaleX: 1, duration: 1.8, ease: "power1.inOut" },
        0
      )
      .to(root.querySelector(".word"), { y: "-110%", duration: 0.6, ease: "power3.in" }, "+=0.05")
      .to(root.querySelector(".count-wrap"), { y: "110%", duration: 0.6, ease: "power3.in" }, "<")
      .to(root, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.05");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-end justify-between bg-void text-cream px-8 pb-8 pointer-events-none"
    >
      <div className="overflow-hidden">
        <div className="word font-display text-[12vw] leading-[0.85] tracking-tight">
          ASSEMBLE
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="count-wrap font-display text-[8vw] leading-none flex items-baseline gap-2">
          <span ref={counterRef}>000</span>
          <span className="text-gold">%</span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gold bar" />
    </div>
  );
}
