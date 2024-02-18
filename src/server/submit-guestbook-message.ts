"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SubmitGuestbookMessage(formData: FormData) {
  const message = formData.get("message");

  if (!message) {
    throw new Error("Message is required");
  }

  revalidatePath("/guestbook");
  redirect("/guestbook");
}
