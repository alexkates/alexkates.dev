import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function GuestbookList() {
  const supabaseClient = createClient(cookies());
  const { data, error } = await supabaseClient.from("guestbook").select("*");

  return (
    <ul className="flex flex-col gap-6">
      {data
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        ?.map((message) => (
          <li key={message.id} className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={message.avatar} alt={message.username} />
              <AvatarFallback>{message.username.substring(0, 2)}</AvatarFallback>
            </Avatar>
            {message.username}: {message.message}
          </li>
        ))}
    </ul>
  );
}
