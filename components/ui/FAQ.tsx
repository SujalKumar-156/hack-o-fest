"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Who can apply?",
    a: "Anyone over 18 with a laptop and the will to ship. Solo or teams of up to 4. Students, professionals, and the dangerously curious are all welcome.",
  },
  {
    q: "How long is the hackathon?",
    a: "72 hours of focused build time, with semifinals and finals spread across the following month. The full event runs August 14 → October 5.",
  },
  {
    q: "Does it cost anything?",
    a: "No. Registration is free. Travel grants are available for finalists who need them.",
  },
  {
    q: "Can I use AI / agents?",
    a: "Yes. We assume you will. Just ship something defensible. The Agents Unchained theme is literally about it.",
  },
  {
    q: "What's the IP situation?",
    a: "You own everything you build. Sponsors get a non-exclusive look before press if you win their track. That's it.",
  },
  {
    q: "Is this affiliated with Marvel?",
    a: "No. This is an unofficial hackathon homage. We love comics. We're not lawyers.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-void py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="flex items-center gap-4 mb-6 text-cream/60 uppercase tracking-[0.4em] text-xs md:text-sm">
          <span className="w-2 h-2 rounded-full bg-infinity" />
          SECTION // 05 · ASKED A LOT
        </div>
        <h2 className="font-display text-[18vw] md:text-[12vw] leading-[0.82] tracking-tight text-cream">
          F<span className="text-crimson">·</span>A
          <span className="text-crimson">·</span>Q
        </h2>

        <ul className="mt-16 md:mt-24 border-t border-cream/15">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-cream/15">
                <button
                  className="w-full flex items-center justify-between gap-6 py-7 md:py-10 text-left group"
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-magnetic
                >
                  <span className="flex items-baseline gap-6 md:gap-10">
                    <span className="font-accent text-gold text-xl md:text-3xl">
                      0{i + 1}
                    </span>
                    <span className="font-display text-cream text-2xl md:text-5xl leading-tight tracking-tight">
                      {f.q}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full border border-cream/30 grid place-items-center transition-all duration-500 ${
                      isOpen ? "bg-gold border-gold rotate-45" : ""
                    }`}
                  >
                    <span className={`text-2xl md:text-4xl ${isOpen ? "text-ink" : "text-cream"}`}>+</span>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: isOpen ? 400 : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="pb-8 md:pb-10 pl-0 md:pl-24 max-w-3xl text-cream/75 text-lg md:text-xl font-body leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
