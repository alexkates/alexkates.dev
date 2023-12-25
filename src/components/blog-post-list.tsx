import BlogPost from "@/types/BlogPost";
import BlogPostItem from "./blog-post-item";

type Props = {
  posts: BlogPost[];
};

function BlogPostList({ posts }: Props) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => (
        <BlogPostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default BlogPostList;
