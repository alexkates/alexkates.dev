import { cn, fadeIn } from "@/lib/utils";
import Link from "next/link";

const recoveryLinks = [
  { href: "/", label: "Home", description: "Start with Alex's profile and selected work." },
  { href: "/llms.txt", label: "Agent guide", description: "Find the best pages and Markdown endpoints." },
  { href: "/sitemap.xml", label: "Sitemap", description: "See every public page." },
  { href: "/blog", label: "Blog", description: "Browse notes on software and products." },
] as const;

export default function NotFound() {
  return (
    <main className="flex flex-col gap-6">
      <section className={cn(fadeIn, "animation-delay-200 flex flex-col items-start gap-4 rounded-[2rem] border bg-muted/20 p-6 sm:p-8")}>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">404</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">Page not found.</h1>
        <p className="max-w-2xl text-pretty leading-7 text-muted-foreground">
          This URL does not point to a page on alexkates.dev. Use one of these links to find the information you need.
        </p>
        <nav aria-label="Recovery links" className="w-full">
          <ul className="grid gap-2 sm:grid-cols-2">
            {recoveryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex h-full flex-col gap-1 rounded-2xl border bg-background/50 p-4 transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="font-medium underline underline-offset-4">{link.label}</span>
                  <span className="text-sm text-muted-foreground">{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  );
}
