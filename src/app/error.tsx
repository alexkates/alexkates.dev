"use client";

import { Button } from "@/components/ui/button";
import { cn, fadeIn } from "@/lib/utils";

function Error({ reset }: { reset: () => void }) {
  return (
    <section className={cn(fadeIn, "animation-delay-200 flex flex-col items-start gap-4 rounded-[2rem] border bg-muted/20 p-6 sm:p-8")}>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Error</p>
      <h1 className="text-balance text-3xl font-semibold tracking-tight">Something went wrong.</h1>
      <p className="text-pretty text-muted-foreground">Try the page again. If it keeps failing, come back in a few minutes.</p>
      <Button onClick={reset}>Try Again</Button>
    </section>
  );
}

export default Error;
