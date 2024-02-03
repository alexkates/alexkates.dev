import NewQuoteButton from "@/components/new-quote-button";
import Quote from "@/components/quote";
import QuoteLimitInput from "@/components/quote-limit-input";
import QuoteTagsFilter from "@/components/quote-tags-filter";
import { cn } from "@/lib/utils";
import fetchRandomQuotes from "@/server/get-random-quotes";
import { Suspense } from "react";

export const revalidate = 86400; // 24 hours

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    tags?: string;
    limit?: number;
  };
}) {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";
  const limit = searchParams?.limit ?? 1;

  const quotes = await fetchRandomQuotes({
    tags: searchParams?.tags,
    limit,
  });

  return (
    <main className="mb-8 flex flex-col gap-4">
      <section className={cn(fadeIn, "flex items-center justify-between gap-2 animation-delay-200")}>
        <QuoteLimitInput />
        <Suspense fallback={null}>
          <QuoteTagsFilter />
        </Suspense>
        <NewQuoteButton />
      </section>
      <section className={cn(fadeIn, "animation-delay-400")}>
        <Suspense fallback={"Loading..."}>
          <ul className="flex flex-col gap-8">
            {quotes?.map((quote) => (
              <li key={quote._id}>
                <Quote quote={quote} />
              </li>
            ))}
          </ul>
        </Suspense>
      </section>
    </main>
  );
}