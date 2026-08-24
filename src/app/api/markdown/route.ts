import { getMarkdownForPath } from "@/lib/agent-markdown";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  // Under a proxy rewrite, request.url keeps the original path, so resolve
  // the target page from the explicit header/query before falling back.
  const url = new URL(request.url);
  const pathname = request.headers.get("x-markdown-path") ?? url.searchParams.get("path") ?? url.pathname;
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
