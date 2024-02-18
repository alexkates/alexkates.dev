"use client";

import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function SignOut() {
  const router = useRouter();
  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();

    router.refresh();
  }

  return (
    <Button onClick={signOut} size={"sm"} variant={"link"} className="p-0 text-muted-foreground">
      Sign Out
    </Button>
  );
}
