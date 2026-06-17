import { IDCardForm } from "@/components/id-card/IDCardForm";
import { Footer } from "@/components/ui/Footer";
import { ComicBurst } from "@/components/ui/ComicBurst";

export const metadata = {
  title: "Generate your AVENGER ID // HACK-O-FEST",
};

export default function IDCardPage() {
  return (
    <main className="relative bg-void min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(122,60,255,0.25), transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(255,210,63,0.18), transparent 50%)",
        }}
      />

      <section className="relative pt-44 pb-16 px-6 md:px-16 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-6 text-cream/60 uppercase tracking-[0.4em] text-xs md:text-sm">
          <span className="w-2 h-2 rounded-full bg-gold" />
          GATE // 01 · IDENTIFY YOURSELF
        </div>
        <div className="relative flex items-end justify-between gap-6 mb-4">
          <h1 className="font-display text-[18vw] md:text-[12vw] leading-[0.82] tracking-tight text-cream">
            YOUR <span className="text-gold">ID.</span>
          </h1>
          <div className="hidden md:block">
            <ComicBurst size={200} color="#B4FF39" text="GO!" spikes={18} />
          </div>
        </div>
        <p className="max-w-2xl text-cream/70 text-lg md:text-xl font-body">
          Fill in the details. Download a poster-grade PNG. Print it. Pin it.
          Flex on socials. The card updates live as you type.
        </p>
      </section>

      <section className="relative px-6 md:px-16 max-w-[1600px] mx-auto pb-32">
        <IDCardForm />
      </section>

      <Footer />
    </main>
  );
}
