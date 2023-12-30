import { createServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

function Auth({ userId }: { userId?: string }) {
  async function signOut() {
    "use server";
    const supabase = createServerClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    return redirect("/chess");
  }

  if (userId) {
    return (
      <form action={signOut}>
        <Button type="submit" variant={"link"}>
          Sign out
        </Button>
      </form>
    );
  }

  async function signIn() {
    "use server";
    const supabase = createServerClient();

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback?next=/chess",
      },
    });

    if (error) {
      console.log(error);
    }

    new Promise((resolve) => setTimeout(resolve, 10000));

    redirect(data.url!);
  }

  return (
    <form action={signIn}>
      <button type="submit">Sign in with GitHub</button>
    </form>
  );
}

export default Auth;
