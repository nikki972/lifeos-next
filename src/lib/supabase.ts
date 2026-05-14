import { createClient } from "@supabase/supabase-js";

import {
  env,
  isSupabaseConfigured,
} from "@/shared/config/env";

const fallbackSupabaseUrl =
  "https://example.supabase.co";

const fallbackSupabaseAnonKey =
  "missing-supabase-anon-key";

export const supabase = createClient(
  env.supabaseUrl || fallbackSupabaseUrl,
  env.supabaseAnonKey || fallbackSupabaseAnonKey
);

export { isSupabaseConfigured };
