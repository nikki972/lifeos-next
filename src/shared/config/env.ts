export const env = {
  supabaseUrl:
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",

  supabaseAnonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
};

if (!env.supabaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL is missing"
  );
}

if (!env.supabaseAnonKey) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing"
  );
}