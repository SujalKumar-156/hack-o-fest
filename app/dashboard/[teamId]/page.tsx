import Link from "next/link";
import { getTeam } from "@/lib/teamsApi";
import { TeamJourney } from "@/components/dashboard/TeamJourney";
import { Footer } from "@/components/ui/Footer";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  const team = await getTeam(teamId);

  if (!team) {
    return (
      <main className="relative bg-void min-h-screen overflow-hidden">
        <section className="relative pt-44 pb-16 px-6 md:px-16 max-w-[1400px] mx-auto">
          <div className="font-accent text-crimson text-2xl tracking-widest mb-4">
            DASHBOARD // SIGNAL LOST
          </div>
          <h1 className="font-display text-[16vw] md:text-[10vw] leading-[0.82] tracking-tight text-cream">
            Team <span className="text-crimson">{teamId}</span> not found.
          </h1>
          <p className="mt-6 max-w-2xl text-cream/70 text-lg md:text-xl font-body">
            Double-check your ID. Or try one of the demo dashboards below.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            {["AVNG-7K2", "XMEN-3PQ", "GRDN-9MZ", "WKDA-1ZR"].map((id) => (
              <Link
                key={id}
                href={`/dashboard/${id}`}
                className="px-6 py-4 rounded-full border-2 border-cream/20 hover:border-gold font-display text-xl tracking-widest text-cream hover:text-gold transition-colors"
                data-magnetic
              >
                {id}
              </Link>
            ))}
            <Link
              href="/status"
              className="px-6 py-4 rounded-full bg-crimson text-cream font-display text-xl tracking-widest"
              data-magnetic
            >
              SCAN BY ID →
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative bg-void min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 70% 0%, rgba(255,210,63,0.15), transparent 50%), radial-gradient(ellipse at 20% 100%, rgba(122,60,255,0.15), transparent 55%)",
        }}
      />
      <TeamJourney team={team} />
      <Footer />
    </main>
  );
}
