import GuestbookForm from "@/components/guestbook-form";
import GuestbookList from "@/components/guestbook-list";
import ParagraphSkeleton from "@/components/paragraph-skeleton";
import SignInWithGitHub from "@/components/sign-in-with-github";
import SignOut from "@/components/sign-out";
import { cn, fadeIn } from "@/lib/utils";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    submitted?: boolean;
  };
}) {
  const supabaseClient = createClient(cookies());
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user)
    return (
      <main className="flex flex-col gap-8">
        <section className={cn(fadeIn, "animation-delay-200 flex flex-col gap-2")}>
          Welcome to my guestbook!
          <div>
            <SignInWithGitHub />
          </div>
        </section>
        <section className={cn(fadeIn, "animation-delay-600")}>
          <Suspense fallback={<ParagraphSkeleton />}>
            <GuestbookList />
          </Suspense>
        </section>
      </main>
    );

  return (
    <main className="flex flex-col gap-8">
      <section className={cn(fadeIn, "animation-delay-200")}>
        <div className="flex items-center gap-2">
          Hi, {user.user_metadata.user_name}!<div className="animate animate-wave animation-delay-1000">👋</div>
          <SignOut />
        </div>
        {searchParams?.submitted ? <span>Your message has been submitted! Thanks for signing my guestbook.</span> : <GuestbookForm />}
      </section>
      <section className={cn(fadeIn, "animation-delay-600")}>
        <Suspense fallback={<ParagraphSkeleton />}>
          <GuestbookList />
        </Suspense>
      </section>
    </main>
  );
}
