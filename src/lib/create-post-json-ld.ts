import profile from "@/data/profile";
import { BlogPost } from "@/types/blog";

export default function createPostJsonLd(post: BlogPost) {
  const siteUrl = "https://alexkates.dev";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Blog",
    "@id": `${siteUrl}/blog`,
    mainEntityOfPage: `${siteUrl}/blog`,
    name: "Alex Kates | Blog",
    description: "Articles by Alex Kates about building software and products.",
    publisher: {
      "@type": "Person",
      "@id": siteUrl,
      name: profile.name,
      image: {
        "@type": "ImageObject",
        url: `${siteUrl}/headshot.png`,
      },
    },
    blogPost: [
      {
        "@type": "BlogPosting",
        "@id": postUrl,
        mainEntityOfPage: postUrl,
        headline: post.title,
        name: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        author: {
          "@type": "Person",
          "@id": siteUrl,
          name: profile.name,
          url: siteUrl,
        },
        image: {
          "@type": "ImageObject",
          url: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/opengraph-image.png`,
        },
        url: postUrl,
        keywords: post.tags,
      },
    ],
  };
  return schema;
}
