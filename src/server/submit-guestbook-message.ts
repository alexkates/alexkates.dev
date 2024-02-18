"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

export default async function submitGuestbookMessage(formData: FormData) {
  const supabaseClient = createClient(cookies());
  const message = formData.get("message") as string;

  if (!message) {
    throw new Error("Message is required");
  }

  const { error, status, statusText } = await supabaseClient.from("guestbook").insert({ message });

  console.log({ error, status, statusText });

  revalidatePath("/guestbook");
  redirect("/guestbook");
}
