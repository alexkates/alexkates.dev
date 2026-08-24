import { getAllPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

const siteUrl = "https://alexkates.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about", "/projects", "/oss", "/games", "/resume", "/blog"];

  return [
    ...pages.map((pathname) => ({
      url: `${siteUrl}${pathname}`,
      changeFrequency: "monthly" as const,
      priority: pathname === "/" ? 1 : 0.7,
    })),
    ...getAllPosts().map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
