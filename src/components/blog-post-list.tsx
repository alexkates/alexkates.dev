import { BlogPost } from "@/types/blog";
import { SortTypes } from "@/types/sort-types";
import BlogPostListItem from "./blog-post-list-item";

type Props = {
  posts: BlogPost[];
  query?: string;
  sort?: string;
  tags?: string;
};

function BlogPostList({ posts, query = "", sort = "", tags = "" }: Props) {
  const sortedPosts = posts.toSorted((a, b) => {
    if (sort === SortTypes.Date) {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }

    return 0;
  });

  const tagsArray = tags?.split(",").filter((t) => t !== "");
  const visiblePosts = sortedPosts.filter((post) => {
    const searchableText = `${post.title} ${post.description} ${post.markdown}`.toLowerCase();
    const isMatchingQuery = searchableText.includes(query.toLowerCase());
    const isMatchingTags = tagsArray.length === 0 || tagsArray.some((tag) => post.tags.includes(tag));
    return isMatchingQuery && isMatchingTags;
  });

  if (visiblePosts.length === 0) {
    return <p className="rounded-2xl border bg-muted/20 p-6 text-sm text-muted-foreground">No posts match those filters.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {visiblePosts.map((post) => (
        <BlogPostListItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default BlogPostList;
