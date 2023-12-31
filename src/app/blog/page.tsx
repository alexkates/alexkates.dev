import BlogPostList from "@/components/blog-post-list";
import Search from "@/components/search";
import Sort from "@/components/sort";
import fetchBlogPosts from "@/server/fetchBlogPosts";
import BlogPostsPage from "@/types/blog-posts-page";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sort?: string;
  };
}) {
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "date";

  const pages: BlogPostsPage[] = [];
  let hasNextPage = true;
  let after = "";

  while (hasNextPage) {
    const page = await fetchBlogPosts({ after });
    pages.push(page);
    hasNextPage = page.pageInfo.hasNextPage;
    after = page.pageInfo.endCursor;
  }

  const posts = pages.flatMap((p) => p.blogPosts);

  return (
    <main className="flex flex-col gap-y-4 mb-8">
      <section className="flex gap-x-2">
        <Search placeholder="Search blog posts..." />
        <Sort />
      </section>
      <section>
        <Suspense key={query} fallback={"Loading..."}>
          <BlogPostList posts={posts} query={query} sort={sort} />
        </Suspense>
      </section>
    </main>
  );
}
