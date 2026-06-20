import { getSupabase } from "@/lib/supabase";

export default async function TestPage() {
  const supabase = getSupabase();
  
  if (!supabase) {
    return <p>❌ Supabase not configured — check .env.local</p>
  }
  
  const { data, error } = await supabase.from("teams").select("*");
  
  return (
    <div>
      <p>Connected: {data ? "✅ Yes" : "❌ No"}</p>
      <p>Error: {error ? error.message : "None"}</p>
      <p>Teams count: {data?.length ?? 0}</p>
    </div>
  );
}