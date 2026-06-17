"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { getTeam, type Team, stageLabel } from "@/lib/teamsApi";

export function StatusChecker() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<Team | null | "missing">(null);
  const [isPending, startTransition] = useTransition();

  const check = () => {
    if (!id.trim()) return;
    startTransition(async () => {
      const t = await getTeam(id);
      setResult(t ?? "missing");
    });
  };

  return (
    <div className="space-y-12">
      {/* radial-scan input */}
      <div className="relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-500 rounded-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(255,210,63,0.18) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(122,60,255,0.16) 0%, transparent 60%)",
          }}
        />
        <div className="relative flex flex-col md:flex-row gap-4 items-stretch">
          <input
            type="text"
            placeholder="ENTER TEAM ID · E.G. AVNG-7K2"
            value={id}
            onChange={(e) => setId(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter") check();
            }}
            className="flex-1 bg-ink/60 border-2 border-cream/20 focus:border-gold outline-none font-display text-cream text-3xl md:text-5xl px-6 py-6 rounded-2xl tracking-widest placeholder:text-cream/30 transition-all"
          />
          <button
            onClick={check}
            disabled={isPending}
            data-magnetic
            className="px-10 py-6 bg-crimson text-cream font-display text-2xl md:text-3xl tracking-widest rounded-2xl disabled:opacity-60"
          >
            {isPending ? "SCANNING…" : "SCAN →"}
          </button>
        </div>
        <div className="mt-3 text-cream/50 text-sm font-body uppercase tracking-[0.3em] flex flex-wrap gap-x-6 gap-y-2">
          <span>Try: AVNG-7K2</span>
          <span>· XMEN-3PQ</span>
          <span>· GRDN-9MZ</span>
          <span>· WKDA-1ZR</span>
        </div>
      </div>

      {/* result */}
      {result === "missing" && (
        <div
          className="relative border-2 border-crimson/40 rounded-3xl p-10 md:p-14 bg-ink/40"
          style={{ animation: "slamIn 0.5s cubic-bezier(0.2, 0.9, 0.2, 1.1) both" }}
        >
          <div className="font-accent text-crimson text-3xl tracking-widest">
            SIGNAL LOST.
          </div>
          <div className="font-display text-cream text-5xl md:text-7xl leading-[0.85] mt-3">
            No team found with that ID.
          </div>
          <p className="mt-4 text-cream/65 text-lg max-w-xl font-body">
            Check the casing. The ID is shared in your registration confirmation
            email. Use one of the demo IDs above to see what a real lookup feels
            like.
          </p>
        </div>
      )}

      {result && result !== "missing" && (
        <ResultCard team={result} />
      )}

      <style jsx>{`
        @keyframes slamIn {
          0% { opacity: 0; transform: translateY(40px) scale(1.05); filter: blur(8px); }
          60% { transform: translateY(0) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
      `}</style>
    </div>
  );
}

function ResultCard({ team }: { team: Team }) {
  const currentIdx = team.stage_history.findIndex(
    (s) => s.stage === team.current_stage
  );
  const passed = team.stage_history.filter((s) => s.status === "passed").length;
  const failed = team.stage_history.some((s) => s.status === "failed");

  return (
    <div
      className="relative border-2 border-gold/40 rounded-3xl overflow-hidden bg-ink/50 backdrop-blur-sm"
      style={{
        animation: "slamIn 0.6s cubic-bezier(0.2, 0.9, 0.2, 1.1) both",
        boxShadow: "0 60px 120px -40px rgba(255,210,63,0.4)",
      }}
    >
      <div className="halftone absolute inset-0 opacity-20 pointer-events-none" />
      <div className="relative p-8 md:p-14">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="font-accent text-gamma text-2xl tracking-widest">
              SIGNAL ACQUIRED.
            </div>
            <h2 className="font-display text-cream text-[12vw] md:text-[6vw] leading-[0.85] mt-3 tracking-tight">
              {team.name}
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-cream/70 font-body uppercase tracking-[0.3em] text-sm">
              <span>ID · {team.id}</span>
              <span className="text-cream/40">·</span>
              <span>TRACK · {team.track.toUpperCase()}</span>
              {team.score != null && (
                <>
                  <span className="text-cream/40">·</span>
                  <span>SCORE · {team.score}</span>
                </>
              )}
            </div>
          </div>

          <div
            className={`px-6 py-3 rounded-full font-accent text-2xl tracking-widest ${
              failed
                ? "bg-crimson text-cream"
                : "bg-gamma text-ink"
            }`}
          >
            {failed ? "ELIMINATED" : "ACTIVE"}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-3">
          {team.stage_history.map((s, i) => {
            const isCurrent = i === currentIdx;
            return (
              <div
                key={s.stage}
                className={`relative rounded-2xl p-4 border-2 ${
                  s.status === "passed"
                    ? "border-gamma/60 bg-gamma/10"
                    : s.status === "failed"
                    ? "border-crimson/60 bg-crimson/10"
                    : isCurrent
                    ? "border-gold/60 bg-gold/10 animate-pulse"
                    : "border-cream/15 bg-cream/5 opacity-60"
                }`}
              >
                <div className="font-accent text-cream/60 text-xs tracking-widest">
                  STAGE 0{i + 1}
                </div>
                <div className="font-display text-cream text-lg md:text-xl leading-tight mt-1">
                  {stageLabel(s.stage)}
                </div>
                <div className="mt-3 font-body text-xs uppercase tracking-[0.2em] text-cream/60">
                  {s.status === "passed"
                    ? "PASSED"
                    : s.status === "failed"
                    ? "ELIMINATED"
                    : isCurrent
                    ? "IN PROGRESS"
                    : "LOCKED"}
                </div>
                <div className="font-body text-xs text-cream/50 mt-1">{s.at}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={`/dashboard/${team.id}`}
            data-magnetic
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-ink font-display text-xl md:text-2xl tracking-widest"
          >
            OPEN DASHBOARD
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <span className="font-body text-cream/60 text-sm">
            {passed} of {team.stage_history.length} stages passed
          </span>
        </div>
      </div>
    </div>
  );
}
