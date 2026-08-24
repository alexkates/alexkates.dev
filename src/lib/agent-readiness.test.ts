import { GET as getMarkdown } from "@/app/api/markdown/route";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import profile from "@/data/profile";
import { negotiateRepresentation } from "@/lib/accept";
import { getMarkdownForPath } from "@/lib/agent-markdown";
import createOrganizationJsonLd from "@/lib/create-organization-json-ld";
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

test("rewrites negotiated Markdown requests with an explicit path", () => {
  const response = proxy(
    new NextRequest("https://alexkates.dev/about", {
      headers: { Accept: "text/markdown" },
    }),
  );

  assert.match(response.headers.get("x-middleware-rewrite") ?? "", /\/api\/markdown\?path=%2Fabout$/);
});

test("resolves the Markdown path from the forwarded header, query, then URL", async () => {
  const fromHeader = getMarkdown(new Request("https://alexkates.dev/about.md", { headers: { "x-markdown-path": "/about.md" } }));
  const fromQuery = getMarkdown(new Request("https://alexkates.dev/api/markdown?path=%2Fabout.md"));
  const fromUrl = getMarkdown(new Request("https://alexkates.dev/about.md"));

  assert.match(await fromHeader.text(), /^# About Alex Kates/m);
  assert.match(await fromQuery.text(), /^# About Alex Kates/m);
  assert.match(await fromUrl.text(), /^# About Alex Kates/m);
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

test("exposes contact details through the Markdown home and contact pages", () => {
  const home = getMarkdownForPath("/");
  const contact = getMarkdownForPath("/contact");

  assert.equal(contact.status, 200);
  assert.ok(home.body.includes(profile.email));
  assert.match(home.body, /## Connect/);
  assert.match(home.body, /\[Contact\]\(https:\/\/alexkates\.dev\/contact\.md\)/);
  assert.match(contact.body, /^# Contact Alex Kates/m);
  assert.ok(contact.body.includes(profile.email));
  assert.ok(contact.body.length > 500);
});

test("serves a substantive Markdown privacy policy", () => {
  const privacy = getMarkdownForPath("/privacy");
  const explicit = getMarkdownForPath("/privacy.md");

  assert.equal(privacy.status, 200);
  assert.equal(explicit.status, 200);
  assert.equal(explicit.body, privacy.body);
  assert.match(privacy.body, /^# Privacy policy/m);
  assert.match(privacy.body, /Vercel Analytics/);
  assert.ok(privacy.body.length > 500);
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

test("publishes an Organization identity with contact and address details", () => {
  const jsonLd = createOrganizationJsonLd();

  assert.equal(jsonLd["@context"], "https://schema.org");
  assert.equal(jsonLd["@type"], "Organization");
  assert.equal(jsonLd["@id"], "https://alexkates.dev/#organization");
  assert.equal(jsonLd.name, "Alex Kates");
  assert.equal(jsonLd.url, "https://alexkates.dev");

  assert.equal(jsonLd.contactPoint.length > 0, true);
  for (const contactPoint of jsonLd.contactPoint) {
    assert.equal(contactPoint["@type"], "ContactPoint");
    assert.equal(contactPoint.email, profile.email);
    assert.ok(contactPoint.contactType);
  }

  assert.equal(jsonLd.address["@type"], "PostalAddress");
  assert.equal(jsonLd.address.addressLocality, "Philadelphia");
  assert.equal(jsonLd.address.addressRegion, "PA");
  assert.equal(jsonLd.address.addressCountry, "US");

  const personId = createPersonJsonLd()["@id"];
  assert.equal(jsonLd.founder["@id"], personId);
});

function assertRouteDeclaresCanonical(route: string, file: string, canonical: string) {
  const source = readFileSync(file, "utf8");
  assert.match(source, new RegExp(`canonical:\\s*["'\`]${canonical.replace(/\//g, "\\/")}["'\`]`), route);
}

test("declares canonical URLs on every public route", () => {
  assertRouteDeclaresCanonical("/", "src/app/layout.tsx", "/");
  assertRouteDeclaresCanonical("/about", "src/app/about/page.tsx", "/about");
  assertRouteDeclaresCanonical("/contact", "src/app/contact/page.tsx", "/contact");
  assertRouteDeclaresCanonical("/privacy", "src/app/privacy/page.tsx", "/privacy");
  assertRouteDeclaresCanonical("/projects", "src/app/projects/page.tsx", "/projects");
  assertRouteDeclaresCanonical("/oss", "src/app/oss/page.tsx", "/oss");
  assertRouteDeclaresCanonical("/games", "src/app/games/page.tsx", "/games");
  assertRouteDeclaresCanonical("/resume", "src/app/resume/page.tsx", "/resume");
  assertRouteDeclaresCanonical("/blog", "src/app/blog/page.tsx", "/blog");
  assertRouteDeclaresCanonical("/blog/[slug]", "src/app/blog/[slug]/page.tsx", "/blog/\\${params.slug}");
});

test("publishes an llms.txt file with agent guidance", () => {
  const llms = readFileSync("public/llms.txt", "utf8");

  assert.match(llms, /^# Alex Kates\n\n> /);
  assert.match(llms, /## When to use this/);
  assert.match(llms, /Accept: text\/markdown/);
  assert.match(llms, /https:\/\/alexkates\.dev\/sitemap\.xml/);
  assert.match(llms, /https:\/\/alexkates\.dev\/contact\.md/);
  assert.match(llms, /https:\/\/alexkates\.dev\/privacy\.md/);
});

test("publishes crawler discovery metadata", () => {
  const robotsFile = robots();
  const sitemapEntries = sitemap();

  assert.deepEqual(robotsFile.rules, { userAgent: "*", allow: "/" });
  assert.equal(robotsFile.sitemap, "https://alexkates.dev/sitemap.xml");
  for (const pathname of ["/", "/about", "/contact", "/privacy"]) {
    assert.ok(
      sitemapEntries.some((entry) => entry.url === `https://alexkates.dev${pathname}`),
      `sitemap should include ${pathname}`,
    );
  }
  assert.ok(sitemapEntries.some((entry) => entry.url.endsWith("/blog/introducing-dynamodb-extended-query-history-favorites-and-editor-defaults")));
});
