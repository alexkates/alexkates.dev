"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export default async function submitGuestbookMessage(formData: FormData) {
  const supabaseClient = createClient(cookies());
  const message = formData.get("message") as string;

  if (!message) {
    throw new Error("Message is required");
  }

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to submit a message");
  }

  const { avatar_url: avatar, user_name: username } = user.user_metadata;

  const { error, status, statusText } = await supabaseClient.from("guestbook").insert({
    message,
    avatar,
    username,
  });

  console.log({ error, status, statusText });

  revalidatePath("/guestbook");
  redirect("/guestbook?submitted=true");
}
