"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function Auth() {
  const [email, setEmail] = useState<string | undefined>();
  useEffect(() => {
    async function init() {
      const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setEmail(user?.email);
    }

    init();
  }, []);

  async function signIn() {
    const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback?next=/chess",
      },
    });

    if (error) {
      console.error(error);
      return;
    }
  }

  async function signOut() {
    const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    setEmail(undefined);
  }

  return (
    <div className="flex items-center text-sm">
      {email ? (
        <>
          <span>Welcome, {email}</span>
          <Button variant={"link"} onClick={signOut}>
            Sign out
          </Button>
        </>
      ) : (
        <Button variant={"outline"} onClick={signIn}>
          Sign in
        </Button>
      )}
    </div>
  );
}

export default Auth;
