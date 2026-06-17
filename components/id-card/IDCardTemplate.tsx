"use client";

import { forwardRef } from "react";

export type IDCardData = {
  name: string;
  team: string;
  role: string;
  track: string;
  teamId: string;
  photo?: string | null;
};

type Props = { data: IDCardData; scale?: number };

export const IDCardTemplate = forwardRef<HTMLDivElement, Props>(function IDCardTemplate(
  { data, scale = 1 },
  ref
) {
  return (
    <div
      ref={ref}
      className="relative bg-void text-cream"
      style={{
        width: 1080 * scale,
        height: 1680 * scale,
        transform: scale === 1 ? undefined : `scale(${1})`,
        fontFamily: "var(--font-grotesk)",
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          width: 1080 * scale,
          height: 1680 * scale,
        }}
      >
        {/* cosmic gradient backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 40% 25%, #5a2bd0 0%, #1a0a3a 35%, #0a0a12 70%)",
          }}
        />
        {/* halftone */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(245,239,224,0.16) 1.5px, transparent 2px)",
            backgroundSize: `${14 * scale}px ${14 * scale}px`,
            opacity: 0.6,
          }}
        />
        {/* gold-foil border */}
        <div
          className="absolute"
          style={{
            inset: 30 * scale,
            border: `${4 * scale}px solid #FFD23F`,
            borderRadius: 28 * scale,
            boxShadow: `0 0 ${60 * scale}px rgba(255,210,63,0.35)`,
          }}
        />
        <div
          className="absolute"
          style={{
            inset: 46 * scale,
            border: `${1 * scale}px dashed rgba(245,239,224,0.35)`,
            borderRadius: 22 * scale,
          }}
        />

        {/* header band */}
        <div
          className="absolute flex items-center justify-between"
          style={{
            top: 80 * scale,
            left: 80 * scale,
            right: 80 * scale,
          }}
        >
          <div
            className="flex items-center"
            style={{ gap: 18 * scale }}
          >
            <div
              className="relative grid place-items-center"
              style={{ width: 64 * scale, height: 64 * scale }}
            >
              <span className="absolute inset-0 rounded-full bg-crimson" />
              <span className="absolute inset-[16%] rounded-full bg-void" />
              <span className="absolute inset-[34%] rounded-full bg-crimson" />
            </div>
            <div
              style={{
                fontFamily: "var(--font-anton)",
                fontSize: 40 * scale,
                letterSpacing: "0.06em",
              }}
            >
              HACK·O·FEST
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--font-bangers)",
              color: "#FFD23F",
              fontSize: 36 * scale,
              letterSpacing: "0.18em",
            }}
          >
            AVENGER ID
          </div>
        </div>

        {/* photo */}
        <div
          className="absolute overflow-hidden hex-clip"
          style={{
            top: 220 * scale,
            left: 120 * scale,
            width: 420 * scale,
            height: 480 * scale,
            background: "#1a1326",
            border: `${3 * scale}px solid rgba(255,210,63,0.6)`,
            boxShadow: `0 0 ${40 * scale}px rgba(122,60,255,0.4)`,
          }}
        >
          {data.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.photo}
              alt="ID photo"
              className="w-full h-full object-cover"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              crossOrigin="anonymous"
            />
          ) : (
            <div
              className="w-full h-full grid place-items-center"
              style={{
                background:
                  "radial-gradient(circle at 50% 35%, #2a1a4d 0%, #0a0a12 80%)",
                color: "rgba(245,239,224,0.5)",
                fontFamily: "var(--font-anton)",
                fontSize: 96 * scale,
              }}
            >
              ?
            </div>
          )}
        </div>

        {/* burst behind name */}
        <div
          className="absolute"
          style={{
            top: 720 * scale,
            left: 90 * scale,
            width: 200 * scale,
            height: 200 * scale,
            background: `conic-gradient(from 0deg, #FFD23F 0deg 12deg, transparent 12deg 30deg, #FFD23F 30deg 42deg, transparent 42deg 60deg, #FFD23F 60deg 72deg, transparent 72deg 90deg, #FFD23F 90deg 102deg, transparent 102deg 120deg, #FFD23F 120deg 132deg, transparent 132deg 150deg, #FFD23F 150deg 162deg, transparent 162deg 180deg, #FFD23F 180deg 192deg, transparent 192deg 210deg, #FFD23F 210deg 222deg, transparent 222deg 240deg, #FFD23F 240deg 252deg, transparent 252deg 270deg, #FFD23F 270deg 282deg, transparent 282deg 300deg, #FFD23F 300deg 312deg, transparent 312deg 330deg, #FFD23F 330deg 342deg, transparent 342deg 360deg)`,
            clipPath: "polygon(50% 0%, 64% 25%, 100% 25%, 75% 50%, 100% 75%, 64% 75%, 50% 100%, 36% 75%, 0% 75%, 25% 50%, 0% 25%, 36% 25%)",
            opacity: 0.6,
            transform: "rotate(-12deg)",
          }}
        />

        {/* name + meta block */}
        <div
          className="absolute"
          style={{
            top: 760 * scale,
            left: 120 * scale,
            right: 80 * scale,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: 140 * scale,
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              color: "#F5EFE0",
            }}
          >
            {data.name || "YOUR NAME"}
          </div>

          <div
            className="mt-6"
            style={{
              fontFamily: "var(--font-bangers)",
              fontSize: 56 * scale,
              color: "#FFD23F",
              letterSpacing: "0.1em",
              marginTop: 28 * scale,
            }}
          >
            {data.role || "BUILDER"}
          </div>
        </div>

        {/* meta grid */}
        <div
          className="absolute grid grid-cols-2"
          style={{
            bottom: 200 * scale,
            left: 120 * scale,
            right: 80 * scale,
            gap: 40 * scale,
          }}
        >
          {[
            { label: "TEAM", value: data.team || "—" },
            { label: "ID", value: data.teamId || "—" },
            { label: "TRACK", value: (data.track || "—").toUpperCase() },
            { label: "STATUS", value: "ACTIVE" },
          ].map((m) => (
            <div key={m.label}>
              <div
                style={{
                  fontFamily: "var(--font-grotesk)",
                  fontSize: 22 * scale,
                  letterSpacing: "0.3em",
                  color: "rgba(245,239,224,0.55)",
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-anton)",
                  fontSize: 56 * scale,
                  lineHeight: 1,
                  marginTop: 6 * scale,
                  color: "#F5EFE0",
                }}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* QR + footer */}
        <div
          className="absolute flex items-end justify-between"
          style={{
            bottom: 80 * scale,
            left: 120 * scale,
            right: 80 * scale,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-grotesk)",
                fontSize: 18 * scale,
                letterSpacing: "0.4em",
                color: "rgba(245,239,224,0.5)",
              }}
            >
              ISSUED · {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" }).toUpperCase()}
            </div>
            <div
              className="mt-3"
              style={{
                fontFamily: "var(--font-bangers)",
                fontSize: 32 * scale,
                color: "#B4FF39",
                letterSpacing: "0.15em",
              }}
            >
              CLEARED FOR THE MULTIVERSE
            </div>
          </div>

          <div
            className="relative"
            style={{
              width: 140 * scale,
              height: 140 * scale,
              background: "#F5EFE0",
              padding: 12 * scale,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  "repeating-linear-gradient(0deg, #14141C 0 4px, transparent 4px 8px), repeating-linear-gradient(90deg, #14141C 0 4px, transparent 4px 8px)",
              }}
            />
            <div
              className="absolute inset-0 grid place-items-center"
              style={{ color: "#14141C", fontFamily: "var(--font-anton)", fontSize: 24 * scale }}
            >
              <span style={{ background: "#F5EFE0", padding: `${2 * scale}px ${6 * scale}px` }}>QR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
