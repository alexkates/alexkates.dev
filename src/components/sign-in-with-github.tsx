"use client";

import { createClient } from "@supabase/supabase-js";
import { Button } from "./ui/button";

function SignInWithGithub() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }

  return <Button onClick={signInWithGithub}>Sign in with Github</Button>;
}

export default SignInWithGithub;
