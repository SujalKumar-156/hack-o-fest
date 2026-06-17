import { Hero } from "@/components/hero/Hero";
import { Tracks } from "@/components/tracks/Tracks";
import { Themes } from "@/components/themes/Themes";
import { Prizes } from "@/components/prizes/Prizes";
import { Timeline } from "@/components/timeline/Timeline";
import { FAQ } from "@/components/ui/FAQ";
import { Footer } from "@/components/ui/Footer";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import { Manifesto } from "@/components/ui/Manifesto";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MarqueeTicker
        items={[
          "REGISTRATION OPEN",
          "$50K POOL",
          "6 TRACKS",
          "72 HOURS",
          "GLOBAL EVENT",
          "BUILT BY CODERS",
        ]}
        bg="bg-gold"
        fg="text-ink"
      />
      <Tracks />
      <Manifesto />
      <Themes />
      <MarqueeTicker
        items={[
          "ASSEMBLE",
          "BUILD",
          "DEMO",
          "WIN",
          "REPEAT",
          "MULTIVERSE",
        ]}
        bg="bg-crimson"
        fg="text-cream"
        separator="∞"
        speed={40}
      />
      <Prizes />
      <Timeline />
      <FAQ />
      <Footer />
    </main>
  );
}
