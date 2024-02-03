import Hero from "@/components/hero";
import BlogPostListSkeleton from "@/components/paragraph-skeleton";
import ProjectList from "@/components/project-list";
import TopBlogPostsList from "@/components/top-blog-posts-list";
import Projects from "@/data/projects";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

export default async function Page() {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";
  const projects = Projects.filter((project) => project.name.includes("Croissant"));

  return (
    <article className="flex flex-col gap-6">
      <section className={cn(fadeIn, "animation-delay-200")}>
        <Hero />
      </section>

      <section className={cn(fadeIn, "flex flex-col gap-2 animation-delay-600")}>
        <p className="prose prose-neutral dark:prose-invert">Here are a few things I&apos;ve been working on recently.</p>
        <ProjectList projects={projects} />
      </section>

      <section className={cn(fadeIn, "flex flex-col gap-2 animation-delay-800")}>
        <p className="prose prose-neutral dark:prose-invert">I also write about things I build. Check out some of my recent posts.</p>
        <Suspense fallback={<BlogPostListSkeleton />}>
          <TopBlogPostsList />
        </Suspense>
      </section>
    </article>
  );
}
