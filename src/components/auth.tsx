import { createServerClient } from "@/lib/supabase";
import { Github } from "lucide-react";
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
    console.log("sign in");
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

    console.log(data.url);

    return redirect(data.url!);
  }

  return (
    <form action={signIn}>
      <Button type="submit" variant={"outline"}>
        <Github className="mr-2 w-4 h-4" />
        Sign in with GitHub
      </Button>
    </form>
  );
}

export default Auth;
