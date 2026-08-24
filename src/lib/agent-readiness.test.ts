import { GET as getMarkdown } from "@/app/api/markdown/route";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { negotiateRepresentation } from "@/lib/accept";
import { getMarkdownForPath } from "@/lib/agent-markdown";
import createPersonJsonLd from "@/lib/create-person-json-ld";
import { proxy } from "@/proxy";
import { NextRequest } from "next/server";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("negotiates Markdown before HTML when requested", () => {
  assert.equal(negotiateRepresentation("text/markdown"), "text/markdown");
  assert.equal(negotiateRepresentation("text/html, text/markdown"), "text/html");
  assert.equal(negotiateRepresentation("text/html;q=0.8, text/markdown;q=1"), "text/markdown");
  assert.equal(negotiateRepresentation("text/markdown;q=0, text/html"), "text/html");
  assert.equal(negotiateRepresentation("text/*, text/markdown"), "text/markdown");
  assert.equal(negotiateRepresentation("text/markdown;q=0, */*;q=0.8"), "text/html");
  assert.equal(negotiateRepresentation("text/html;q=0, text/markdown;q=0"), null);
  assert.equal(negotiateRepresentation("application/json"), null);
  assert.equal(negotiateRepresentation(null), "text/html");
});

test("leaves Next.js RSC requests on the normal application path", () => {
  const response = proxy(
    new NextRequest("https://alexkates.dev/about", {
      headers: { Accept: "text/x-component", RSC: "1" },
    }),
  );

  assert.equal(response.headers.get("x-middleware-rewrite"), null);
});

test("serves negotiated Markdown with the required cache variance", async () => {
  const response = getMarkdown(new Request("https://alexkates.dev/api/markdown?path=%2F"));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "text/markdown; charset=utf-8");
  assert.match(response.headers.get("Vary") ?? "", /(^|,\s*)Accept(,|$)/i);
  assert.match(await response.text(), /^# Alex Kates/m);
});

test("returns 406 for an unsatisfiable representation request", () => {
  const response = proxy(
    new NextRequest("https://alexkates.dev/about", {
      headers: { Accept: "application/json" },
    }),
  );

  assert.equal(response.status, 406);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.equal(response.headers.get("Content-Type"), "text/plain; charset=utf-8");
  assert.match(response.headers.get("Vary") ?? "", /(^|,\s*)Accept(,|$)/i);
});

test("renders a substantial Markdown homepage and explicit Markdown siblings", () => {
  const home = getMarkdownForPath("/");
  const sibling = getMarkdownForPath("/index.md");

  assert.equal(home.status, 200);
  assert.equal(sibling.status, 200);
  assert.equal(sibling.body, home.body);
  assert.match(home.body, /^# Alex Kates/m);
  assert.ok(home.body.length > 500);
});

test("returns a recoverable Markdown 404", () => {
  const result = getMarkdownForPath("/does-not-exist");

  assert.equal(result.status, 404);
  assert.match(result.body, /\[Site map\]\(https:\/\/alexkates\.dev\/sitemap\.xml\)/);
  assert.match(result.body, /\[Agent guide\]\(https:\/\/alexkates\.dev\/llms\.txt\)/);
});

test("publishes a Person identity for the homepage", () => {
  const jsonLd = createPersonJsonLd();

  assert.equal(jsonLd["@context"], "https://schema.org");
  assert.equal(jsonLd["@type"], "Person");
  assert.equal(jsonLd.name, "Alex Kates");
  assert.equal(jsonLd.url, "https://alexkates.dev");
  assert.ok(jsonLd.sameAs.includes("https://github.com/alexkates"));
});

test("publishes an llms.txt file with agent guidance", () => {
  const llms = readFileSync("public/llms.txt", "utf8");

  assert.match(llms, /^# Alex Kates\n\n> /);
  assert.match(llms, /## When to use this/);
  assert.match(llms, /Accept: text\/markdown/);
  assert.match(llms, /https:\/\/alexkates\.dev\/sitemap\.xml/);
});

test("publishes crawler discovery metadata", () => {
  const robotsFile = robots();
  const sitemapEntries = sitemap();

  assert.deepEqual(robotsFile.rules, { userAgent: "*", allow: "/" });
  assert.equal(robotsFile.sitemap, "https://alexkates.dev/sitemap.xml");
  assert.ok(sitemapEntries.some((entry) => entry.url === "https://alexkates.dev/"));
  assert.ok(sitemapEntries.some((entry) => entry.url.endsWith("/blog/introducing-dynamodb-extended-query-history-favorites-and-editor-defaults")));
});
