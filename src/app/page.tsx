import Bio from "@/components/bio";
import Hero from "@/components/hero";
import ProjectList from "@/components/project-list";
import SectionHeading from "@/components/section-heading";
import TopBlogPostsList from "@/components/top-blog-posts-list";
import Projects from "@/data/projects";
import profile from "@/data/profile";
import { cn } from "@/lib/utils";

export default function Page() {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";
  const projects = Projects.filter((project) => project.name.includes("Croissant"));

  return (
    <main className="flex flex-col gap-12">
      <section>
        <Hero />
      </section>

      <section className={cn(fadeIn, "animation-delay-400 flex flex-col gap-5 border-t pt-8")}>
        <SectionHeading eyebrow="Selected work" title="What I’m building" description="A few Croissant products I’ve worked on recently." />
        <ProjectList projects={projects} />
      </section>

      <section className={cn(fadeIn, "animation-delay-600 flex flex-col gap-5 border-t pt-8")}>
        <SectionHeading eyebrow="Writing" title="Latest posts" description="Notes on software, products, and things I’ve learned while building." />
        <TopBlogPostsList />
      </section>

      <section className={cn(fadeIn, "animation-delay-800 flex flex-col gap-5 border-t pt-8")}>
        <SectionHeading
          eyebrow="About"
          title="The short version"
          description="Who I am, what I work on, and how to reach me."
        />
        <Bio />
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          The fastest way to reach me is email at{" "}
          <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
            {profile.email}
          </a>
          . I also respond on X and LinkedIn, or you can use the{" "}
          <a href="/contact" className="underline underline-offset-4">
            contact page
          </a>
          .
        </p>
      </section>
    </main>
  );
}
