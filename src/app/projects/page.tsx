import PageIntro from "@/components/page-intro";
import ProjectList from "@/components/project-list";
import Projects from "@/data/projects";
import { cn } from "@/lib/utils";

export default function Page() {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  return (
    <main className="flex flex-col gap-10">
      <PageIntro eyebrow="Selected work" title="Projects">
        <p>I like building products from zero to one. Here are a few I&apos;ve worked on recently.</p>
      </PageIntro>
      <section className={cn(fadeIn, "animation-delay-400")} aria-label="Projects">
        <ProjectList projects={Projects} />
      </section>
    </main>
  );
}
