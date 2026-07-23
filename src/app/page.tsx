import Hero from "@/components/hero";
import BlogPostListSkeleton from "@/components/paragraph-skeleton";
import ProjectList from "@/components/project-list";
import SectionHeading from "@/components/section-heading";
import TopBlogPostsList from "@/components/top-blog-posts-list";
import Projects from "@/data/projects";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

export default async function Page() {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";
  const projects = Projects.filter((project) => project.name.includes("Croissant"));

  return (
    <article className="flex flex-col gap-12">
      <section>
        <Hero />
      </section>

      <section className={cn(fadeIn, "animation-delay-400 flex flex-col gap-5 border-t pt-8")}>
        <SectionHeading eyebrow="Selected work" title="What I’m building" description="A few Croissant products I’ve worked on recently." />
        <ProjectList projects={projects} />
      </section>

      <section className={cn(fadeIn, "animation-delay-600 flex flex-col gap-5 border-t pt-8")}>
        <SectionHeading eyebrow="Writing" title="Latest posts" description="Notes on software, products, and things I’ve learned while building." />
        <Suspense fallback={<BlogPostListSkeleton />}>
          <TopBlogPostsList />
        </Suspense>
      </section>
    </article>
  );
}
