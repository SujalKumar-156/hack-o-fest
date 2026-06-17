import { StatusChecker } from "@/components/status/StatusChecker";
import { Footer } from "@/components/ui/Footer";
import { isUsingMockData } from "@/lib/teamsApi";

export const metadata = {
  title: "Team Status // HACK-O-FEST",
};

export default function StatusPage() {
  const mock = isUsingMockData();
  return (
    <main className="relative bg-void min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(0,229,255,0.18), transparent 50%), radial-gradient(ellipse at 20% 100%, rgba(255,45,85,0.15), transparent 55%)",
        }}
      />

      <section className="relative pt-44 pb-16 px-6 md:px-16 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-6 text-cream/60 uppercase tracking-[0.4em] text-xs md:text-sm">
          <span className="w-2 h-2 rounded-full bg-cyan" />
          GATE // 02 · LOCATE YOUR TEAM
        </div>
        <h1 className="font-display text-[18vw] md:text-[12vw] leading-[0.82] tracking-tight text-cream">
          TEAM <span className="text-cyan">STATUS.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-cream/70 text-lg md:text-xl font-body">
          Drop in your team ID. We&apos;ll tell you which round you&apos;re in,
          which gates you&apos;ve cleared, and whether you&apos;re still in the
          fight.
        </p>
        {mock && (
          <div className="mt-6 inline-block px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold font-accent text-sm tracking-widest">
            SUPABASE NOT CONFIGURED · USING SEED DATA
          </div>
        )}
      </section>

      <section className="relative px-6 md:px-16 max-w-[1400px] mx-auto pb-32">
        <StatusChecker />
      </section>

      <Footer />
    </main>
  );
}
