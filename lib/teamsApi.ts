import { getSupabase, isSupabaseConfigured } from "./supabase";
import { mockTeams, allStages } from "./mockTeams";

export type Stage =
  | "registered"
  | "round1"
  | "round2"
  | "semifinal"
  | "final";

export type StageStatus = "passed" | "failed" | "pending";

export type Member = { name: string; role: string };

export type StageHistoryEntry = {
  stage: Stage;
  status: StageStatus;
  at: string;
};

export type Team = {
  id: string;
  name: string;
  track: string;
  current_stage: Stage;
  score?: number;
  members: Member[];
  stage_history: StageHistoryEntry[];
  created_at: string;
};

export async function getTeam(id: string): Promise<Team | null> {
  const trimmed = id.trim().toUpperCase();
  if (!trimmed) return null;

  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb
      .from("teams")
      .select("*")
      .eq("id", trimmed)
      .maybeSingle();
    if (error) {
      console.error("[teamsApi] supabase error", error);
      return null;
    }
    if (data) return data as Team;
  }

  return mockTeams.find((t) => t.id === trimmed) ?? null;
}

export async function listTeams(): Promise<Team[]> {
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb.from("teams").select("*").limit(50);
    if (!error && data) return data as Team[];
  }
  return mockTeams;
}

export function getStages() {
  return allStages;
}

export function stageLabel(stage: Stage) {
  switch (stage) {
    case "registered":
      return "REGISTERED";
    case "round1":
      return "ROUND 1 · IDEATION";
    case "round2":
      return "ROUND 2 · BUILD";
    case "semifinal":
      return "SEMIFINAL · LIVE";
    case "final":
      return "FINAL · ON-STAGE";
  }
}

export function isUsingMockData() {
  return !isSupabaseConfigured();
}
