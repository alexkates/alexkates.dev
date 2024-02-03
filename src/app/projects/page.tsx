import ProjectList from "@/components/project-list";
import Projects from "@/data/projects";
import { cn } from "@/lib/utils";

export default function Page() {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  return (
    <article className="flex flex-col gap-2">
      <section className={cn(fadeIn, "prose prose-neutral animation-delay-200 dark:prose-invert")}>
        <p>I&apos;m passionate about building products, especially from zero to one. Here are a few I&apos;ve been a part of recently.</p>
      </section>
      <section className={cn(fadeIn, "animation-delay-400")}>
        <ProjectList projects={Projects} />
      </section>
    </article>
  );
}
