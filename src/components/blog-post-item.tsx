import BlogPost from "@/types/BlogPost";
import Link from "next/link";

type Props = {
  post: BlogPost;
};

export default function BlogPostItem({ post }: Props) {
  return (
    <li>
      <Link href={`https://alexkates.dev/${post.slug}`} target="_blank">
        {post.title}
      </Link>
    </li>
  );
}
