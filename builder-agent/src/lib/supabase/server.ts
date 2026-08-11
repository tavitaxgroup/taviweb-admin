import type { BusinessLead } from "@/types/demo";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const BUSINESSES_TABLE = process.env.SUPABASE_BUSINESSES_TABLE ?? process.env.SUPABASE_LEADS_TABLE ?? "leads";

export function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

export async function getBusinessByPlaceId(placeId: string): Promise<BusinessLead | null> {
  if (!hasSupabaseConfig()) return null;

  try {
    const url = new URL(`${SUPABASE_URL}/rest/v1/${BUSINESSES_TABLE}`);
    url.searchParams.set("place_id", `eq.${placeId}`);
    url.searchParams.set("select", "*");
    url.searchParams.set("limit", "1");

    const response = await fetch(url.toString(), {
      headers: {
        apikey: SUPABASE_KEY!,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      console.error(`Supabase fetch failed for place_id=${placeId}: ${response.status} ${response.statusText}`);
      return null;
    }

    const rows = (await response.json()) as BusinessLead[];
    return rows[0] ?? null;
  } catch (error) {
    console.error(`Supabase fetch error for place_id=${placeId}:`, error);
    return null;
  }
}
