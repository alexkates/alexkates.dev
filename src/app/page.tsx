import Hero from "@/components/hero";
import ProjectSection from "@/components/project-section";
import { cn } from "@/lib/utils";

export default function Home() {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  return (
    <article className="flex flex-col">
      <section className={cn(fadeIn, "animation-delay-100")}>
        <Hero />
      </section>

      <section className={cn(fadeIn, "animation-delay-300")}>
        <ProjectSection />
      </section>
    </article>
  );
}
