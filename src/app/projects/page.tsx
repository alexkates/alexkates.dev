import PageIntro from "@/components/page-intro";
import ProjectList from "@/components/project-list";
import Projects from "@/data/projects";
import { cn } from "@/lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  alternates: {
    canonical: "/projects",
  },
};

export default function Page() {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  return (
    <main className="flex flex-col gap-10">
      <PageIntro title="Projects">
        <p>My work at Croissant and some projects of my own.</p>
      </PageIntro>
      <section className={cn(fadeIn, "animation-delay-400")} aria-label="Projects">
        <ProjectList projects={Projects} />
      </section>
    </main>
  );
}
