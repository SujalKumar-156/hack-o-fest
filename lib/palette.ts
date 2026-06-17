export const palette = {
  void: "#0A0A12",
  ink: "#14141C",
  cream: "#F5EFE0",
  crimson: "#FF2D55",
  gold: "#FFD23F",
  gamma: "#B4FF39",
  infinity: "#7A3CFF",
  cyan: "#00E5FF",
} as const;

export type PaletteKey = keyof typeof palette;

export const trackColors: Record<string, { stone: string; ink: string; aura: string }> = {
  "reality": { stone: palette.crimson, ink: palette.cream, aura: "rgba(255,45,85,0.45)" },
  "power": { stone: palette.infinity, ink: palette.cream, aura: "rgba(122,60,255,0.45)" },
  "mind": { stone: palette.gamma, ink: palette.ink, aura: "rgba(180,255,57,0.45)" },
  "time": { stone: palette.gold, ink: palette.ink, aura: "rgba(255,210,63,0.45)" },
  "space": { stone: palette.cyan, ink: palette.ink, aura: "rgba(0,229,255,0.45)" },
  "soul": { stone: "#FF7A3C", ink: palette.ink, aura: "rgba(255,122,60,0.45)" },
};
