"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { IDCardTemplate, type IDCardData } from "./IDCardTemplate";
import { exportIdCard } from "@/lib/idcard-export";

const tracks = ["reality", "power", "mind", "time", "space", "soul"];

export function IDCardForm() {
  const [data, setData] = useState<IDCardData>({
    name: "",
    team: "",
    role: "Captain · Builder",
    track: "reality",
    teamId: "AVNG-XXX",
    photo: null,
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  // generate a fun id when team changes
  useEffect(() => {
    if (data.team) {
      const slug = data.team.replace(/[^A-Z]/gi, "").slice(0, 4).toUpperCase();
      const num = Math.floor(Math.random() * 9000 + 1000);
      if (data.teamId === "AVNG-XXX") {
        setData((d) => ({ ...d, teamId: `${slug || "TEAM"}-${num}` }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.team]);

  // live scale-to-fit the 1080×1680 stage into preview container
  useEffect(() => {
    const fit = () => {
      const stage = stageRef.current;
      const preview = previewRef.current;
      if (!stage || !preview) return;
      const w = preview.clientWidth;
      const h = preview.clientHeight;
      const s = Math.min(w / 1080, h / 1680);
      stage.style.transform = `scale(${s})`;
      stage.style.transformOrigin = "top left";
      stage.style.position = "absolute";
      stage.style.top = "50%";
      stage.style.left = "50%";
      stage.style.marginLeft = `${-(1080 * s) / 2}px`;
      stage.style.marginTop = `${-(1680 * s) / 2}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // pointer-tilt
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let rx = 0,
      ry = 0;
    let tx = 0,
      ty = 0;
    const onMove = (e: MouseEvent) => {
      const r = preview.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tx = py * -8;
      ty = px * 10;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    preview.addEventListener("mousemove", onMove);
    preview.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const tick = () => {
      rx += (tx - rx) * 0.12;
      ry += (ty - ry) * 0.12;
      const stage = stageRef.current;
      if (stage) {
        const cur = stage.style.transform || "";
        // preserve scale, add rotate
        stage.style.perspective = "1400px";
        const scaleMatch = cur.match(/scale\(([\d.]+)\)/);
        const s = scaleMatch ? scaleMatch[1] : "1";
        stage.style.transform = `scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      preview.removeEventListener("mousemove", onMove);
      preview.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const onPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setData((d) => ({ ...d, photo: url }));
  };

  const onDownload = async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const slug =
        (data.name || "avenger").toLowerCase().replace(/\s+/g, "-") +
        "-" +
        (data.teamId || "id").toLowerCase();
      await exportIdCard(cardRef.current, `hack-o-fest-${slug}`);
    } catch (err) {
      console.error(err);
      alert("Couldn't export ID card. Check the console.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Form */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <label className="block font-accent text-gold text-xl tracking-widest mb-3">
            FULL NAME
          </label>
          <input
            type="text"
            value={data.name}
            placeholder="Tony Reyes"
            onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
            className="w-full bg-transparent border-b-2 border-cream/30 focus:border-gold outline-none font-display text-cream text-3xl md:text-5xl py-3 placeholder:text-cream/30 transition-colors"
          />
        </div>

        <div>
          <label className="block font-accent text-gold text-xl tracking-widest mb-3">
            TEAM NAME
          </label>
          <input
            type="text"
            value={data.team}
            placeholder="Quantum Avengers"
            onChange={(e) => setData((d) => ({ ...d, team: e.target.value }))}
            className="w-full bg-transparent border-b-2 border-cream/30 focus:border-gold outline-none font-display text-cream text-3xl md:text-4xl py-3 placeholder:text-cream/30 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-accent text-gold text-xl tracking-widest mb-3">
              ROLE
            </label>
            <input
              type="text"
              value={data.role}
              onChange={(e) => setData((d) => ({ ...d, role: e.target.value }))}
              className="w-full bg-transparent border-b-2 border-cream/30 focus:border-gold outline-none font-body text-cream text-xl py-2 placeholder:text-cream/30 transition-colors"
            />
          </div>
          <div>
            <label className="block font-accent text-gold text-xl tracking-widest mb-3">
              TRACK
            </label>
            <select
              value={data.track}
              onChange={(e) => setData((d) => ({ ...d, track: e.target.value }))}
              className="w-full bg-ink/60 border-2 border-cream/30 focus:border-gold outline-none font-display text-cream text-xl py-3 px-4 transition-colors rounded-md"
            >
              {tracks.map((t) => (
                <option key={t} value={t} className="bg-ink text-cream">
                  {t.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-accent text-gold text-xl tracking-widest mb-3">
            PHOTO
          </label>
          <label className="relative block">
            <input
              type="file"
              accept="image/*"
              onChange={onPhoto}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="border-2 border-dashed border-cream/30 hover:border-gold transition-colors rounded-2xl p-8 text-center cursor-pointer">
              <div className="font-display text-cream text-xl md:text-2xl">
                {data.photo ? "Photo locked in ✓" : "Drop or click to upload"}
              </div>
              <div className="text-cream/50 text-sm mt-2 font-body">
                Hi-res, square preferred · We&apos;ll hex-clip it
              </div>
            </div>
          </label>
        </div>

        <div className="pt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={onDownload}
            disabled={busy}
            data-magnetic
            className="group relative inline-flex items-center gap-3 px-8 py-5 rounded-full bg-gold text-ink font-display tracking-widest text-2xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{busy ? "EXPORTING…" : "DOWNLOAD ID"}</span>
            <span className="transition-transform group-hover:translate-x-1">↓</span>
          </button>
          <span className="font-body text-cream/60 text-sm">PNG · 2160 × 3360 · transparent ready</span>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:col-span-7">
        <div
          ref={previewRef}
          className="relative w-full aspect-[1080/1680] max-h-[80vh] rounded-3xl bg-ink/40 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(122,60,255,0.2), transparent 60%), #0a0a12",
            boxShadow: "0 60px 120px -40px rgba(122,60,255,0.55)",
          }}
        >
          <div ref={stageRef} style={{ width: 1080, height: 1680 }}>
            <IDCardTemplate ref={cardRef} data={data} scale={1} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between font-body text-sm text-cream/60">
          <span>HOVER TO TILT · LIVE PREVIEW</span>
          <span>FONT — ANTON · BANGERS · GROTESK</span>
        </div>
      </div>
    </div>
  );
}
