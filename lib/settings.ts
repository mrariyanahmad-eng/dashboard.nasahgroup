import { createClient } from "@/lib/supabase/server";

const DEFAULTS = {
  site_name: "Nasah Group LTD",
  logo_mark_url: "/logo-mark.jpg",
};

export async function getSettings() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("site_name, logo_mark_url")
      .eq("id", "default")
      .maybeSingle();

    if (!data) return DEFAULTS;
    return { ...DEFAULTS, ...data };
  } catch {
    return DEFAULTS;
  }
}
