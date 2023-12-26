import BlogPost from "@/types/BlogPost";
import BlogPostItem from "./blog-post-item";

type Props = {
  posts: BlogPost[];
  query: string;
  sort: string;
  direction: string;
};

function BlogPostList({ posts, query, sort, direction }: Props) {
  const sortedPosts = posts.sort((a, b) => {
    if (sort === "published date") {
      if (direction === "asc") {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      } else if (direction === "desc") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    } else if (sort === "views") {
      if (direction === "asc") {
        return a.views - b.views;
      } else if (direction === "desc") {
        return b.views - a.views;
      }
    }

    return 0;
  });

  return (
    <ul className="grid gap-4 grid-cols-2 md:grid-cols-3">
      {sortedPosts
        .filter((post) => post.content.text?.toLowerCase().includes(query?.toLowerCase()))
        .map((post) => (
          <BlogPostItem key={post.id} post={post} />
        ))}
    </ul>
  );
}

export default BlogPostList;
