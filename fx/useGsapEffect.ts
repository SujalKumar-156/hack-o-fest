"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";

type Setup = (ctx: {
  gsap: ReturnType<typeof registerGsap>["gsap"];
  ScrollTrigger: ReturnType<typeof registerGsap>["ScrollTrigger"];
  el: HTMLElement;
}) => void | (() => void);

export function useGsapEffect<T extends HTMLElement = HTMLElement>(setup: Setup, deps: unknown[] = []) {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const { gsap, ScrollTrigger } = registerGsap();
    const el = ref.current;
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = setup({ gsap, ScrollTrigger, el });
    }, el);
    return () => {
      if (typeof cleanup === "function") cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
