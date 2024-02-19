"use client";

import { createClient } from "@/supabase/client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function SignInWithGitHub() {
  async function signInWithGitHub() {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_SIGNIN_REDIRECT_URL,
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
