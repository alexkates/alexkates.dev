import { createPublicationJsonLd } from "@/lib/create-publication-json-ld";
import { getAllPosts } from "@/lib/blog";
import BlogPostList from "./blog-post-list";

type Props = {
  query?: string;
  sort?: string;
  tags?: string;
};

async function AllBlogPostsList({ query, sort, tags }: Props) {
  const posts = getAllPosts();
  const publicationJsonLd = createPublicationJsonLd();

  return (
    <>
      <BlogPostList posts={posts} query={query} sort={sort} tags={tags} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationJsonLd) }} />
    </>
  );
}

export default AllBlogPostsList;
