import OSSProjects from "@/data/oss-projects";
import profile from "@/data/profile";
import Projects from "@/data/projects";
import { notFoundMarkdown } from "@/lib/agent-responses";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const siteUrl = profile.links.website;

export type MarkdownResult = {
  status: 200 | 404;
  body: string;
};

function pageUrl(pathname: string) {
  return pathname === "/" ? siteUrl : `${siteUrl}${pathname}`;
}

function markdownUrl(pathname: string) {
  return `${pageUrl(pathname === "/" ? "/index" : pathname)}.md`;
}

function projectLinks(projects: typeof Projects) {
  return projects.map((project) => `- [${project.name}](${project.url}): ${project.description}`).join("\n");
}

function postLinks() {
  return getAllPosts()
    .map((post) => `- [${post.title}](${markdownUrl(`/blog/${post.slug}`)}): ${post.description}`)
    .join("\n");
}

function renderHome() {
  const selectedProjects = Projects.filter((project) => project.name.includes("Croissant"));
  const latestPosts = getAllPosts().slice(0, 4);

  return `# ${profile.name}

> Product engineer and founding engineer at Croissant in Philadelphia. I build software across web, mobile, and browser extensions.

${profile.bio.join("\n\n")}

## Selected work

${projectLinks(selectedProjects)}

## Writing

${latestPosts.map((post) => `- [${post.title}](${markdownUrl(`/blog/${post.slug}`)}): ${post.description}`).join("\n")}

## Explore

- [About](${markdownUrl("/about")}): Background, interests, and social links.
- [Projects](${markdownUrl("/projects")}): A broader list of products I have built.
- [Open source](${markdownUrl("/oss")}): Small tools and extensions I maintain.
- [Resume](${markdownUrl("/resume")}): Professional experience and technical skills.
`;
}

function renderAbout() {
  return `# About ${profile.name}

> ${profile.headline}

${profile.bio.join("\n\n")}

## Links

- [GitHub](${profile.links.github})
- [X](${profile.links.twitter})
- [LinkedIn](${profile.links.linkedin})
- [Stack Overflow](${profile.links.stackoverflow})
- [Resume](${markdownUrl("/resume")})
`;
}

function renderProjects() {
  return `# Projects

> Products I have worked on from zero to one, across web, mobile, and browser extensions.

${projectLinks(Projects)}
`;
}

function renderOpenSource() {
  return `# Open-source projects

> Small tools and extensions I built to solve problems I kept running into.

${projectLinks(OSSProjects)}
`;
}

function renderGames() {
  return `# Games I am building

> Some games I have always wanted to build and can now do so because of AI.

- [Nature TD](https://naturetd.vercel.app): A tower-defense game inspired by the natural world.
`;
}

function renderResume() {
  return readFileSync(join(process.cwd(), "public", "resume.md"), "utf8").trim() + "\n";
}

function renderBlog() {
  return `# Blog

> Notes on software, products, and things I have learned while building.

${postLinks()}
`;
}

function renderPost(slug: string) {
  const post = getPostBySlug(slug);
  if (!post) return undefined;

  return `# ${post.title}

> ${post.description}

Published: ${post.publishedAt.slice(0, 10)} | ${post.readTimeInMinutes} min read

${post.markdown}
`;
}

function normalizePath(pathname: string) {
  const withoutMarkdown = pathname.endsWith(".md") ? pathname.slice(0, -3) : pathname;
  const withoutTrailingSlash = withoutMarkdown.replace(/\/+$/, "") || "/";

  if (withoutTrailingSlash === "/index") return "/";
  if (withoutTrailingSlash.endsWith("/index")) return withoutTrailingSlash.slice(0, -6) || "/";
  return withoutTrailingSlash;
}

export function getMarkdownForPath(pathname: string): MarkdownResult {
  if (!pathname.startsWith("/")) return { status: 404, body: notFoundMarkdown };

  const normalizedPath = normalizePath(pathname);
  let body: string | undefined;

  switch (normalizedPath) {
    case "/":
      body = renderHome();
      break;
    case "/about":
      body = renderAbout();
      break;
    case "/projects":
      body = renderProjects();
      break;
    case "/oss":
      body = renderOpenSource();
      break;
    case "/games":
      body = renderGames();
      break;
    case "/resume":
      body = renderResume();
      break;
    case "/blog":
      body = renderBlog();
      break;
    default:
      if (normalizedPath.startsWith("/blog/")) body = renderPost(normalizedPath.slice("/blog/".length));
  }

  return body ? { status: 200, body } : { status: 404, body: notFoundMarkdown };
}
