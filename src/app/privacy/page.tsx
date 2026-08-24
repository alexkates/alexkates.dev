import PageIntro from "@/components/page-intro";
import profile from "@/data/profile";
import { cn, fadeIn } from "@/lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Alex Kates | Privacy",
  description:
    "Privacy policy for alexkates.dev: what data this personal site does and does not collect, and how it is handled.",
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    title: "The short version",
    body: [
      "This is a personal website. There are no accounts, no newsletters, no ads, and no comment forms. I don't sell data or build advertising profiles, and I don't ask visitors for personal information.",
    ],
  },
  {
    title: "Hosting and request logs",
    body: [
      "The site is served by Vercel. Like any web host, Vercel processes standard request data such as IP address, user agent, and the requested URL to deliver pages, protect against abuse, and keep the site online. That information is retained according to Vercel's own data policies.",
    ],
  },
  {
    title: "Analytics",
    body: [
      "The site uses Vercel Analytics to understand aggregate usage — for example, which pages are viewed and roughly where visitors are located. The metrics are anonymous and aggregated; I can't identify individual visitors, and no cookies are used for tracking.",
    ],
  },
  {
    title: "Email",
    body: [
      `If you email me at ${profile.email}, I use your address and message only to read your note and reply. I don't add contacts to marketing lists because none exist.`,
    ],
  },
  {
    title: "External links",
    body: [
      "Pages on this site link to third-party websites such as GitHub, LinkedIn, and Croissant. Once you follow a link off this site, the other site's privacy policy applies — I have no control over, and take no responsibility for, their practices.",
    ],
  },
  {
    title: "Changes",
    body: [
      "If I change how the site works in a way that affects this policy, I'll update this page. Questions about anything here? Send me an email and I'll do my best to answer it.",
    ],
  },
];

export default function Page() {
  return (
    <main className="flex flex-col gap-10 pb-8">
      <PageIntro eyebrow="Privacy" title="Privacy policy">
        <p>What this site collects, what it doesn&apos;t, and how anything you send me is handled.</p>
      </PageIntro>

      <section aria-label="Privacy policy details" className={cn(fadeIn, "animation-delay-400 flex flex-col gap-8")}>
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-3">
            <h2 className="text-balance text-2xl font-semibold tracking-tight">{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
        <p className="text-xs text-muted-foreground">Last updated: August 24, 2026</p>
      </section>
    </main>
  );
}
