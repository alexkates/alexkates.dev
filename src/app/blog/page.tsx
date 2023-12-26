import BlogPostList from "@/components/blog-post-list";
import Search from "@/components/search";
import Sort from "@/components/sort";
import fetchBlogPosts from "@/server/fetchBlogPosts";
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
  const posts = await fetchBlogPosts();

  return (
    <main className="flex flex-col gap-y-2">
      <section className="flex gap-x-2">
        <Search placeholder="Search blog posts..." />
        <Sort />
      </section>
      <Suspense key={query} fallback={"Loading..."}>
        <BlogPostList posts={posts} query={query} sort={sort} />
      </Suspense>
    </main>
  );
}
