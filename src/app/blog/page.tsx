import AllBlogPostsList from "@/components/all-blog-posts-list";
import BlogTagsFilter from "@/components/blog-tags-filter";
import PageIntro from "@/components/page-intro";
import ParagraphSkeleton from "@/components/paragraph-skeleton";
import Search from "@/components/search";
import Sort from "@/components/sort";
import { cn, fadeIn } from "@/lib/utils";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    sort?: string;
    tags?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "date";
  const tags = searchParams?.tags || "";

  return (
    <main className="mb-8 flex flex-col gap-10">
      <PageIntro eyebrow="Writing" title="Blog">
        <p>Notes on software, products, and things I&apos;ve learned while building.</p>
      </PageIntro>
      <section className={cn(fadeIn, "animation-delay-300 flex gap-2 rounded-2xl border bg-muted/20 p-3")} aria-label="Blog controls">
        <Search placeholder="Search posts…" />
        <Sort />
        <Suspense fallback={null}>
          <BlogTagsFilter />
        </Suspense>
      </section>
      <section className={cn(fadeIn, "animation-delay-400")} aria-label="Blog posts">
        <Suspense fallback={<ParagraphSkeleton />}>
          <AllBlogPostsList query={query} sort={sort} tags={tags} />
        </Suspense>
      </section>
    </main>
  );
}
