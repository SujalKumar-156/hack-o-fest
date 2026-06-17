"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#tracks", label: "Tracks" },
  { href: "/#themes", label: "Themes" },
  { href: "/#prizes", label: "Prizes" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/id-card", label: "ID Card" },
  { href: "/status", label: "Team Status" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-[1600px] px-6 md:px-10 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-void/55 border border-cream/10 rounded-full"
            : ""
        }`}
        style={{
          paddingTop: scrolled ? 10 : 0,
          paddingBottom: scrolled ? 10 : 0,
        }}
      >
        <Link
          href="/"
          className="group flex items-center gap-3 text-cream"
          data-magnetic
        >
          <span className="relative inline-flex w-9 h-9 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-crimson" />
            <span className="absolute inset-[3px] rounded-full bg-void" />
            <span className="absolute inset-[7px] rounded-full bg-crimson" />
            <span className="absolute inset-[10px] rounded-full bg-void" />
            <span className="absolute inset-[12px] rounded-full bg-crimson" />
          </span>
          <span className="font-display text-2xl tracking-wide">
            HACK<span className="text-crimson">·</span>O<span className="text-crimson">·</span>FEST
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm uppercase tracking-[0.18em] text-cream/80 hover:text-cream transition-colors"
              data-magnetic
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/id-card"
          className="hidden md:inline-flex group relative items-center gap-2 px-6 py-3 rounded-full bg-gold text-ink font-display tracking-wide text-lg overflow-hidden"
          data-magnetic
        >
          <span className="relative z-10">Register</span>
          <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
          <span className="absolute inset-0 bg-crimson translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="absolute inset-0 -z-0 bg-gold" />
        </Link>
      </div>
    </header>
  );
}
