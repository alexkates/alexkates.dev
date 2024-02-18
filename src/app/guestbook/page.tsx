import Guestbook from "@/components/guestbook";
import SignInWithGitHub from "@/components/sign-in-with-github";
import SignOut from "@/components/sign-out";
import { cn, fadeIn } from "@/lib/utils";
import { cookies } from "next/headers";
import { createClient } from "../../../supabase/server";

export default async function Home() {
  const supabaseClient = createClient(cookies());
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user)
    return (
      <main className="flex flex-col gap-4">
        <section className={cn(fadeIn, "animation-delay-200")}>Welcome to my guestbook!</section>
        <section className={cn(fadeIn, "animation-delay-400")}>
          <SignInWithGitHub />
        </section>
      </main>
    );

  return (
    <main className="flex flex-col gap-4">
      <section className={cn(fadeIn, "animation-delay-200")}>
        <div className="flex items-center gap-1">
          Hi, {user.user_metadata.name}!<div className="animate animate-wave animation-delay-1000">👋</div>
          <SignOut />
        </div>
      </section>
      <section className={cn(fadeIn, "animation-delay-400")}>
        <Guestbook />
      </section>
    </main>
  );
}
