"use client";

import { cn, fadeIn } from "@/lib/utils";

function Error() {
  return (
    <section className={cn(fadeIn, "animation-delay-200")}>
      <p className="prose prose-neutral dark:prose-invert">Sorry, it looks like something has gone wrong.</p>
    </section>
  );
}

export default Error;
