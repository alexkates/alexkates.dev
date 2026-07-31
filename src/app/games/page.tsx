import PageIntro from "@/components/page-intro";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  return (
    <main className="flex flex-col gap-10">
      <PageIntro eyebrow="Games" title="Games I'm building">
        <p>Some games I&apos;ve always wanted to build and can now do so because of AI.</p>
      </PageIntro>
      <section className={cn(fadeIn, "animation-delay-400")} aria-label="Games">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <li className="min-w-0">
            <Link
              href="https://naturetd.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-start justify-between gap-3 rounded-2xl border bg-muted/20 p-5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="text-lg font-medium leading-snug">Nature TD</span>
              <ArrowUpRightIcon
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
