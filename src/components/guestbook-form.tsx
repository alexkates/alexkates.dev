import SubmitGuestbookMessage from "@/server/submit-guestbook-message";
import SubmitGuestbookMessageButton from "./submit-guestbook-message-button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function GuestbookForm() {
  return (
    <form action={SubmitGuestbookMessage}>
      <Label htmlFor="message">message</Label>
      <Textarea id="message" name="message" required />
      <SubmitGuestbookMessageButton />
    </form>
  );
}
