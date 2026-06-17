import type { Team, Stage } from "./teamsApi";

export const mockTeams: Team[] = [
  {
    id: "AVNG-7K2",
    name: "Quantum Avengers",
    track: "reality",
    current_stage: "semifinal",
    score: 87,
    members: [
      { name: "Tony Reyes", role: "Captain · Frontend" },
      { name: "Riri Park", role: "ML Engineer" },
      { name: "Sam Okafor", role: "Backend" },
      { name: "Kamala Singh", role: "Design" },
    ],
    stage_history: [
      { stage: "registered", status: "passed", at: "2026-08-14" },
      { stage: "round1", status: "passed", at: "2026-09-03" },
      { stage: "round2", status: "passed", at: "2026-09-12" },
      { stage: "semifinal", status: "pending", at: "2026-09-22" },
      { stage: "final", status: "pending", at: "2026-10-05" },
    ],
    created_at: "2026-08-14",
  },
  {
    id: "XMEN-3PQ",
    name: "Mutant Stack",
    track: "mind",
    current_stage: "round2",
    score: 72,
    members: [
      { name: "Logan Vega", role: "Captain · Systems" },
      { name: "Jean Park", role: "Realtime" },
      { name: "Ororo Diallo", role: "Design Lead" },
    ],
    stage_history: [
      { stage: "registered", status: "passed", at: "2026-08-14" },
      { stage: "round1", status: "passed", at: "2026-09-03" },
      { stage: "round2", status: "pending", at: "2026-09-12" },
      { stage: "semifinal", status: "pending", at: "2026-09-22" },
      { stage: "final", status: "pending", at: "2026-10-05" },
    ],
    created_at: "2026-08-14",
  },
  {
    id: "GRDN-9MZ",
    name: "Cosmic Pylon",
    track: "space",
    current_stage: "final",
    score: 94,
    members: [
      { name: "Peter Quill", role: "Captain · Full-stack" },
      { name: "Gamora Wei", role: "Infra" },
      { name: "Rocket Tan", role: "Hardware" },
      { name: "Mantis Roy", role: "UX" },
    ],
    stage_history: [
      { stage: "registered", status: "passed", at: "2026-08-14" },
      { stage: "round1", status: "passed", at: "2026-09-03" },
      { stage: "round2", status: "passed", at: "2026-09-12" },
      { stage: "semifinal", status: "passed", at: "2026-09-22" },
      { stage: "final", status: "pending", at: "2026-10-05" },
    ],
    created_at: "2026-08-14",
  },
  {
    id: "WKDA-1ZR",
    name: "Vibranium Devs",
    track: "soul",
    current_stage: "round1",
    score: 58,
    members: [
      { name: "Shuri Adeyemi", role: "Captain · Hardware" },
      { name: "M'Baku Okello", role: "Edge" },
    ],
    stage_history: [
      { stage: "registered", status: "passed", at: "2026-08-14" },
      { stage: "round1", status: "failed", at: "2026-09-03" },
      { stage: "round2", status: "pending", at: "2026-09-12" },
      { stage: "semifinal", status: "pending", at: "2026-09-22" },
      { stage: "final", status: "pending", at: "2026-10-05" },
    ],
    created_at: "2026-08-14",
  },
];

export const allStages: Stage[] = [
  "registered",
  "round1",
  "round2",
  "semifinal",
  "final",
];
