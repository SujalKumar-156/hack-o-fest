import Link from "next/link";

const groups: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Event",
    links: [
      { href: "/#tracks", label: "Tracks" },
      { href: "/#themes", label: "Themes" },
      { href: "/#prizes", label: "Prizes" },
      { href: "/#timeline", label: "Timeline" },
    ],
  },
  {
    title: "Teams",
    links: [
      { href: "/id-card", label: "Generate ID" },
      { href: "/status", label: "Check Status" },
      { href: "/dashboard/AVNG-7K2", label: "Demo Dashboard" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "#", label: "Discord" },
      { href: "#", label: "Twitter" },
      { href: "#", label: "Instagram" },
      { href: "#", label: "GitHub" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-ink text-cream overflow-hidden">
      <div className="absolute inset-0 halftone opacity-30" />
      <div className="relative px-6 md:px-16 pt-24 pb-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-6">
            <div className="font-display text-[14vw] md:text-[10rem] leading-[0.85] tracking-tight">
              ASSEMBLE.
              <br />
              <span className="text-crimson">BUILD.</span>
              <br />
              <span className="text-gold">SHIP.</span>
            </div>
            <p className="mt-8 max-w-md text-cream/70 text-lg">
              The cinematic hackathon for chaos engineers, dreamers, and the ones
              who refuse to ship boring software.
            </p>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-10">
            {groups.map((g) => (
              <div key={g.title}>
                <h4 className="font-accent text-2xl text-gold tracking-widest mb-5">
                  {g.title}
                </h4>
                <ul className="space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-cream/80 hover:text-cream transition-colors text-base"
                        data-magnetic
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-cream/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-cream/60 text-sm uppercase tracking-[0.18em]">
          <span>© {new Date().getFullYear()} HACK-O-FEST // A hackathon homage</span>
          <span>Built for the multiverse</span>
        </div>
      </div>
    </footer>
  );
}
