import fetchBlogPost from "@/server/fetchBlogPost";
import "./page.css";
import { Mdx } from "@/components/mdx";

export default async function Page({ params }: { params: { slug: string } }) {
  const {
    title,
    subtitle,
    publishedAt,
    views,
    content: { markdown },
  } = await fetchBlogPost("alexkates.dev", params.slug);

  return (
    <section>
      <span className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        <h2>{subtitle}</h2>
        <h3 className="text-sm font-light">
          {new Date(publishedAt).toLocaleDateString()} • {views} views
        </h3>
      </span>
      <article>
        <Mdx
          code={(markdown ?? "").replace(/align=\"(left|right|center)\"/g, "")}
        />
      </article>
    </section>
  );
}
