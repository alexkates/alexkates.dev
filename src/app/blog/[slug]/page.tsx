import fetchBlogPost from "@/server/fetchBlogPost";

export default async function Page({ params }: { params: { slug: string } }) {
  const {
    content: { html },
  } = await fetchBlogPost("alexkates.dev", params.slug);

  return (
    <article
      className="flex flex-col gap-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
