import { redirect } from "next/navigation";
import createServerClient from "../../supabase/createServerClient";
import { Button } from "./ui/button";

export default function SignOut() {
  async function signOut() {
    "use server";
    const supabase = createServerClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    return redirect("/chess");
  }

  return (
    <form action={signOut}>
      <Button type="submit" variant={"link"}>
        Sign out
      </Button>
    </form>
  );
}
