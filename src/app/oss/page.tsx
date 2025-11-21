import ProjectList from "@/components/project-list";
import OSSProjects from "@/data/oss-projects";
import { cn } from "@/lib/utils";

export default function Page() {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  return (
    <article className="flex flex-col gap-2">
      <section className={cn(fadeIn, "prose prose-neutral animation-delay-200 dark:prose-invert")}>
        <p>Here are a few oss projects I maintain that I hope you find useful.</p>
      </section>
      <section className={cn(fadeIn, "animation-delay-400")}>
        <ProjectList projects={OSSProjects} />
      </section>
    </article>
  );
}
