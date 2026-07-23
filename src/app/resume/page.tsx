import { ExportResumeButton } from "@/components/export-resume-button";
import { Mdx } from "@/components/mdx";
import { cn, fadeIn } from "@/lib/utils";
import { readFile } from "fs/promises";
import { Metadata } from "next/types";
import path from "path";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Alex Kates | Resume";
  const description = "Full-Stack Engineer with 15 years of experience building products for fintech and e-commerce startups.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Alex Kates",
    },
    twitter: {
      card: "summary",
      title,
      description,
      creator: "@thealexkates",
    },
  };
}

export default async function Page() {
  const resumePath = path.join(process.cwd(), "public", "resume.md");
  const resumeContent = await readFile(resumePath, "utf-8");

  return (
    <main className="flex flex-col gap-6">
      <div className={cn(fadeIn, "animation-delay-100 flex items-center justify-between rounded-2xl border bg-muted/20 p-3 print:hidden")}>
        <p className="pl-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Résumé</p>
        <ExportResumeButton resumeMarkdown={resumeContent} />
      </div>
      <article
        id="resume-content"
        className={cn(fadeIn, "animation-delay-200 rounded-[2rem] border bg-muted/10 p-6 sm:p-8 print:border-0 print:p-0")}
      >
        <Mdx code={resumeContent} />
      </article>
    </main>
  );
}
