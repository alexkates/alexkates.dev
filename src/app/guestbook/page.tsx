import Guestbook from "@/components/guestbook";
import SignInWithGitHub from "@/components/sign-in-with-github";
import SignOut from "@/components/sign-out";
import { cn, fadeIn } from "@/lib/utils";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";

type Props = {
  searchParams: { message: string };
};

export default async function Home({ searchParams }: Props) {
  const supabaseClient = createClient(cookies());
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();

  // if (error)
  //   return (
  //     <section className={cn(fadeIn, "animation-delay-200 flex gap-4")}>
  //       <div>Could not authenticate user</div>
  //       <pre>{error.message}</pre>
  //     </section>
  //   );

  if (searchParams.message)
    return (
      <section className={cn(fadeIn, "animation-delay-200 flex gap-4")}>
        <div>{searchParams.message}</div>
      </section>
    );

  if (!user)
    return (
      <main className="flex flex-col gap-4">
        <section className={cn(fadeIn, "animation-delay-200 flex gap-4")}>
          <SignInWithGitHub />
        </section>
      </main>
    );

  return (
    <section className={cn(fadeIn, "animation-delay-200 flex flex-col gap-4")}>
      Welcome, {user.email}
      <SignOut />
      <Guestbook />
    </section>
  );
}
