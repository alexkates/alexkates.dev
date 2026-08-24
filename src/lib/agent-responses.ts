import profile from "@/data/profile";

const siteUrl = profile.links.website;

export const notFoundMarkdown = `# Page not found

The requested page does not exist.

Try one of these:

- [Home](${siteUrl}/index.md)
- [Site map](${siteUrl}/sitemap.xml)
- [Agent guide](${siteUrl}/llms.txt)
- [Blog](${siteUrl}/blog.md)
`;

export const notAcceptableBody = `Not Acceptable

Available representations:
- text/html
- text/markdown
`;
