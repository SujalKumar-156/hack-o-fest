"use client";

import { useEffect, useRef } from "react";

export function useReducedMotion() {
  const reduced = useRef(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = m.matches;
    const onChange = () => (reduced.current = m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function splitChars(text: string): { word: string; chars: string[] }[] {
  return text.split(/(\s+)/).map((tok) => {
    if (/^\s+$/.test(tok)) return { word: tok, chars: [tok] };
    return { word: tok, chars: Array.from(tok) };
  });
}
