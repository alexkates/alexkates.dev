import PageIntro from "@/components/page-intro";
import ProjectList from "@/components/project-list";
import OSSProjects from "@/data/oss-projects";
import { cn } from "@/lib/utils";

export default function Page() {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  return (
    <main className="flex flex-col gap-10">
      <PageIntro eyebrow="Open source" title="Tools I maintain">
        <p>Small tools and extensions I built to solve problems I kept running into.</p>
      </PageIntro>
      <section className={cn(fadeIn, "animation-delay-400")} aria-label="Open-source projects">
        <ProjectList projects={OSSProjects} />
      </section>
    </main>
  );
}
