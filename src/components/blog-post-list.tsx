import BlogPost from "@/types/blog-post";
import { SortTypes } from "@/types/sort-types";
import BlogPostItem from "./blog-post-item";

type Props = {
  posts: BlogPost[];
  query: string;
  sort: string;
  tags: string;
};

function BlogPostList({ posts, query, sort, tags }: Props) {
  const sortedPosts = posts.sort((a, b) => {
    if (sort === SortTypes.Date) {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    } else if (sort === SortTypes.Views) {
      return b.views - a.views;
    }

    return 0;
  });

  const tagsArray = tags.split(",").filter((t) => t !== "");

  return (
    <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grd-cols-3">
      {sortedPosts
        .filter((post) => {
          const isMatchingQuery = post.content.text?.toLowerCase().includes(query?.toLowerCase());
          const isMatchingTags = tagsArray.length === 0 || tagsArray.some((tag) => post.tags.map((t) => t.name.toLowerCase()).includes(tag));
          return isMatchingQuery && isMatchingTags;
        })
        .map((post) => (
          <BlogPostItem key={post.id} post={post} />
        ))}
    </ul>
  );
}

export default BlogPostList;
