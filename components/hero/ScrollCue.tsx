"use client";

export function ScrollCue() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-cream/60 text-xs uppercase tracking-[0.4em]">
      <span>Scroll</span>
      <div className="relative w-[2px] h-16 bg-cream/15 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-1/2 bg-gold"
          style={{ animation: "scrollCue 1.8s cubic-bezier(0.7,0,0.2,1) infinite" }}
        />
      </div>
      <style jsx>{`
        @keyframes scrollCue {
          0% { transform: translateY(-100%); }
          60% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
