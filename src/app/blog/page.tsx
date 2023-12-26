import BlogPostList from "@/components/blog-post-list";
import Search from "@/components/search";
import fetchBlogPosts from "@/server/fetchBlogPosts";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const posts = await fetchBlogPosts();

  return (
    <main className="flex flex-col gap-y-2">
      <Search placeholder="Search blog posts..." />
      <Suspense key={query} fallback={"Loading..."}>
        <BlogPostList posts={posts} query={query} />
      </Suspense>
    </main>
  );
}
