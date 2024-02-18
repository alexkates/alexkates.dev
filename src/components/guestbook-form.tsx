import submitGuestbookMessage from "@/server/submit-guestbook-message";
import SubmitGuestbookMessageButton from "./submit-guestbook-message-button";
import { Input } from "./ui/input";

export default function GuestbookForm() {
  return (
    <form action={submitGuestbookMessage} className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <Input className="max-w-sm" id="message" name="message" required placeholder="Press enter to submit." />
        <SubmitGuestbookMessageButton />
      </div>
    </form>
  );
}
