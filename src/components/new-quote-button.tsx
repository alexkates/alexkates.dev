import { ShuffleIcon } from "@radix-ui/react-icons";
import { revalidatePath } from "next/cache";
import { Button } from "./ui/button";

function NewQuoteButton() {
  async function submit() {
    "use server";
    revalidatePath("/quotes");
  }

  return (
    <form action={submit}>
      <Button variant={"default"} size={"icon"}>
        <ShuffleIcon className="h-4 w-4" />
      </Button>
    </form>
  );
}

export default NewQuoteButton;
