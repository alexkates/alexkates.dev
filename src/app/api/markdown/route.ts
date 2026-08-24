import { getMarkdownForPath } from "@/lib/agent-markdown";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const pathname = new URL(request.url).searchParams.get("path") ?? "";
  const result = getMarkdownForPath(pathname);

  return new Response(result.body, {
    status: result.status,
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
