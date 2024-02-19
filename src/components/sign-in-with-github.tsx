"use client";

import { createClient } from "@/supabase/client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function SignInWithGitHub() {
  async function signInWithGitHub() {
    const supabase = createClient();
    const redirectTo = `${process.env.VERCEL_URL}/auth/callback?next=/guestbook`;
    console.log(`Redirecting to ${redirectTo}`);
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
      },
    });
  }

  return (
    <Button onClick={signInWithGitHub}>
      <GitHubLogoIcon className="mr-2" />
      Sign in with GitHub
    </Button>
  );
}
