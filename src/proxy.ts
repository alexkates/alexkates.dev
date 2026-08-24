import { negotiateRepresentation } from "@/lib/accept";
import { notAcceptableBody } from "@/lib/agent-responses";
import { NextResponse, type NextRequest } from "next/server";

function appendVaryAccept(headers: Headers) {
  const vary = headers.get("Vary");
  if (!vary) {
    headers.set("Vary", "Accept");
    return;
  }

  const values = vary.split(",").map((value) => value.trim().toLowerCase());
  if (!values.includes("accept")) headers.set("Vary", `${vary}, Accept`);
}

function markdownPath(pathname: string) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return normalizedPath === "/" ? "/index.md" : `${normalizedPath}.md`;
}

function addDocumentHeaders(response: NextResponse, pathname: string) {
  appendVaryAccept(response.headers);
  response.headers.set(
    "Link",
    `<${markdownPath(pathname)}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"; type="text/markdown"`,
  );
  return response;
}

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") return NextResponse.next();
  if (request.headers.has("rsc") || request.headers.get("accept")?.toLowerCase().includes("text/x-component")) return NextResponse.next();

  const pathname = request.nextUrl.pathname;
  const isExplicitMarkdownPath = pathname.endsWith(".md");
  const representation = isExplicitMarkdownPath ? "text/markdown" : negotiateRepresentation(request.headers.get("accept"));

  if (representation === null) {
    return new Response(notAcceptableBody, {
      status: 406,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  if (representation === "text/html") return addDocumentHeaders(NextResponse.next(), pathname);

  const url = request.nextUrl.clone();
  url.pathname = "/api/markdown";
  url.search = "";
  url.searchParams.set("path", pathname);

  const response = NextResponse.rewrite(url);
  appendVaryAccept(response.headers);
  return response;
}

export const config = {
  matcher: ["/((?!api/|_next/|_vercel/|.*\\.(?:png|jpe?g|gif|webp|svg|ico|pdf|txt|xml|css|js|woff2?)$).*)"],
};
