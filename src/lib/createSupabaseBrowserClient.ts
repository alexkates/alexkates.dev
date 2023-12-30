import { Database } from "@/types/supabase";
import { createBrowserClient as csr } from "@supabase/ssr";

export default function createBrowserClient() {
  const supabase = csr<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  return supabase;
}
