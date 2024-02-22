import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type cookies } from "next/headers";
import { Database } from "./types";

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;

  return createServerClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {}
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch (error) {}
      },
    },
  });
}
