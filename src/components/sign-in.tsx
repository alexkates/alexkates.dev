import { createServerActionClient } from "@/lib/createSupabaseServerClient";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export default function SignIn() {
  async function signIn() {
    "use server";
    const supabase = createServerActionClient();

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback?next=/chess",
      },
    });

    if (error) {
      console.log(error);
    }

    redirect(data.url!);
  }

  return (
    <form action={signIn}>
      <Button type="submit">Sign in with GitHub</Button>
    </form>
  );
}
