"use client";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function SubmitGuestbookMessageButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant={"default"} disabled={pending} size={"icon"}>
      <PaperPlaneIcon className="pl-1 h-5 w-5" />
    </Button>
  );
}

export default SubmitGuestbookMessageButton;
