import PageIntro from "@/components/page-intro";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next/types";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Alex Kates | Games";
  const description = "Some games I've always wanted to build and can now do so because of AI.";

  return {
    title,
    description,
    alternates: {
      canonical: "/games",
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Alex Kates",
      images: "https://alexkates.dev/opengraph-image.png",
      url: "https://alexkates.dev/games",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: "https://alexkates.dev/opengraph-image.png",
      creator: "@thealexkates",
      site: "@thealexkates",
    },
  };
}

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
              className="group flex h-full items-start justify-between gap-3 rounded-2xl border bg-muted/20 p-5 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="text-lg font-medium leading-snug">Nature TD</span>
              <ArrowUpRightIcon
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-muted-foreground transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              />
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
