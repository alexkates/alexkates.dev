import Hero from "@/components/hero";
import ProjectList from "@/components/project-list";
import { cn } from "@/lib/utils";
import { Project } from "@/types/Project";

export default function Home() {
  const projects: Project[] = [
    {
      name: "Croissant Chrome Extension",
      description:
        "The Croissant Chrome extension offers Guaranteed Buyback™ options for up to 1 year when you shop at your favorite brands and retailers for free.",
      image: "/croissant-chrome-extension.png",
      url: "https://croissant.com/chrome-extension",
    },
  ];

  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  return (
    <article className="flex flex-col">
      <section className={cn(fadeIn, "animation-delay-100")}>
        <Hero />
      </section>

      <section className={cn(fadeIn, "animation-delay-200")}>
        <ProjectList projects={projects} />
      </section>
    </article>
  );
}
