import BlogPost from "@/types/blog-post";
import { SortTypes } from "@/types/sort-types";
import BlogPostItem from "./blog-post-item";

type Props = {
  posts: BlogPost[];
  query: string;
  sort: string;
};

function BlogPostList({ posts, query, sort }: Props) {
  const sortedPosts = posts.sort((a, b) => {
    if (sort === SortTypes.Date) {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    } else if (sort === SortTypes.Views) {
      return b.views - a.views;
    }

    return 0;
  });

  return (
    <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grd-cols-3">
      {sortedPosts
        .filter((post) => post.content.text?.toLowerCase().includes(query?.toLowerCase()))
        .map((post) => (
          <BlogPostItem key={post.id} post={post} />
        ))}
    </ul>
  );
}

export default BlogPostList;
