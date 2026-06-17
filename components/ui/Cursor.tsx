"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onEnter = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-magnetic], a, button, input, textarea")) {
        scale = 2.2;
      }
    };
    const onLeave = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-magnetic], a, button, input, textarea")) {
        scale = 1;
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onEnter);
    window.addEventListener("mouseout", onLeave);

    let raf = 0;
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      const cur = parseFloat(ring.dataset.s || "1");
      const ns = cur + (scale - cur) * 0.18;
      ring.dataset.s = String(ns);

      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${ns})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.body.style.cursor = "none";

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[90] w-[8px] h-[8px] rounded-full bg-gold pointer-events-none mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[90] w-[42px] h-[42px] rounded-full border border-cream/60 pointer-events-none mix-blend-difference"
      />
    </>
  );
}
