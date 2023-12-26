import BlogPost from "@/types/BlogPost";
import BlogPostItem from "./blog-post-item";

type Props = {
  posts: BlogPost[];
  query: string;
};

function BlogPostList({ posts, query }: Props) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {posts
        .filter((post) => post.content.text?.toLowerCase().includes(query?.toLowerCase()))
        .map((post) => (
          <BlogPostItem key={post.id} post={post} />
        ))}
    </ul>
  );
}

export default BlogPostList;
