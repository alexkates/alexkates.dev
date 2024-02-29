import BadgeList from "@/components/badge-list";
import Bio from "@/components/bio";
import CardListSkeleton from "@/components/card-list-skeleton";
import ParagraphSkeleton from "@/components/paragraph-skeleton";
import SocialList from "@/components/social-list";
import { cn, fadeIn } from "@/lib/utils";
import Image from "next/image";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="flex flex-col gap-4">
      <section className={cn(fadeIn, "animation-delay-200 flex gap-4")}>
        <Image src="/headshot.png" alt="A picture of me" width={175} height={175} />
        <Suspense fallback={<ParagraphSkeleton />}>
          <SocialList />
        </Suspense>
      </section>
      <section className={cn(fadeIn, "animation-delay-400")}>
        <Suspense fallback={<ParagraphSkeleton />}>
          <Bio />
        </Suspense>
      </section>
      <section className={cn(fadeIn, "animation-delay-600 flex flex-col gap-2")}>
        <Suspense fallback={<CardListSkeleton />}>
          <span>Here are some Hashnode badges that I&apos;ve earned</span>
          <BadgeList />
        </Suspense>
      </section>
    </main>
  );
}
