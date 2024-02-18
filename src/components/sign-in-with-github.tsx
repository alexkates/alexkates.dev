"use client";

import { createClient } from "../../supabase/client";
import { Button } from "./ui/button";

export default function SignInWithGitHub() {
  async function signInWithGitHub() {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/guestbook`,
      },
    });
  }

  return <Button onClick={signInWithGitHub}>Sign in with GitHub</Button>;
}
