"use client";

import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function SubmitGuestbookMessageButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant={"default"} disabled={pending} size={"icon"}>
      {!pending ? <PaperPlaneIcon className="pl-1 h-5 w-5" /> : <ReloadIcon className="pl-1 h-5 w-5 animate-spin" />}
    </Button>
  );
}

export default SubmitGuestbookMessageButton;
