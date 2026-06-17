"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "gold" | "crimson" | "ghost" | "void";
};

export function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  onClick,
  href,
  variant = "gold",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  const variants = {
    gold: "bg-gold text-ink",
    crimson: "bg-crimson text-cream",
    ghost: "bg-transparent text-cream border border-cream/30",
    void: "bg-void text-cream border border-cream/20",
  };

  const inner = (
    <div
      ref={ref}
      data-magnetic
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative inline-flex items-center gap-3 rounded-full px-7 py-4 font-display tracking-wider text-xl transition-transform duration-300 ease-[cubic-bezier(0.2,0.9,0.2,1.1)] ${variants[variant]} ${className}`}
      style={{ willChange: "transform" }}
    >
      <span className="absolute inset-0 rounded-full bg-current opacity-0 hover:opacity-10 transition-opacity" />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block" onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block bg-transparent border-0 p-0">
      {inner}
    </button>
  );
}
