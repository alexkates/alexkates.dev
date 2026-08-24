import PageIntro from "@/components/page-intro";
import profile from "@/data/profile";
import { cn, fadeIn } from "@/lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Alex Kates | Contact",
  description:
    "How to reach Alex Kates: email, social profiles, and what to expect when you get in touch.",
  alternates: {
    canonical: "/contact",
  },
};

const socialLinks = [
  { label: "GitHub", href: profile.links.github },
  { label: "X (Twitter)", href: profile.links.twitter },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "Stack Overflow", href: profile.links.stackoverflow },
];

export default function Page() {
  return (
    <main className="flex flex-col gap-10 pb-8">
      <PageIntro eyebrow="Contact" title="Get in touch">
        <p>
          The fastest way to reach me is email. I read everything and reply as soon as I can — usually within a few
          days.
        </p>
      </PageIntro>

      <section aria-label="Contact details" className={cn(fadeIn, "animation-delay-400 flex flex-col gap-6")}>
        <div className="flex flex-col gap-3 rounded-[2rem] border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-balance text-2xl font-semibold tracking-tight">Email</h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Good fit for work inquiries, questions about my projects or writing, or just saying hello. If you are
            reaching out about something time-sensitive, mention it in the first line so I can prioritize it.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="w-fit rounded-md font-medium underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {profile.email}
          </a>
        </div>

        <div className="flex flex-col gap-3 rounded-[2rem] border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-balance text-2xl font-semibold tracking-tight">Elsewhere</h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            I&apos;m most responsive on X and LinkedIn, and my code lives on GitHub. I&apos;m based in Philadelphia,
            Pennsylvania.
          </p>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
