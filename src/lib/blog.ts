import { BlogPost, BlogTag } from "@/types/blog";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { z } from "zod";

const contentDirectory = join(process.cwd(), "content", "blog");

const postMetadataSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string().datetime(),
  readTimeInMinutes: z.number().int().nonnegative(),
  tags: z.array(z.string()),
  coverImage: z.string().nullable(),
  draft: z.boolean(),
});

export const getAllPosts = cache((): BlogPost[] => {
  return readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = readFileSync(join(contentDirectory, file), "utf8");
      const { data, content } = matter(source);
      const metadata = postMetadataSchema.parse(data);

      if (`${metadata.slug}.md` !== file) {
        throw new Error(`Blog slug ${metadata.slug} does not match filename ${file}`);
      }

      return { ...metadata, markdown: content.trim() };
    })
    .filter((post) => !post.draft)
    .toSorted((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
});

export const getPostBySlug = cache((slug: string) => getAllPosts().find((post) => post.slug === slug));

export const getAllTags = cache((): BlogTag[] => {
  const counts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }

  return [...counts].map(([name, postsCount]) => ({ name, postsCount })).toSorted((a, b) => b.postsCount - a.postsCount);
});
