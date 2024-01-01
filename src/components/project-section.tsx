import projects from "@/data/projects";
import ProjectList from "./project-list";

function ProjectSection() {
  return (
    <div className="mt-8 flex flex-col gap-2">
      <section className="prose prose-neutral dark:prose-invert">
        <p>I&apos;m passionate about building products, especially from zero to one. Here are a few I&apos;ve been a part of recently.</p>
      </section>
      <ProjectList projects={projects} />
    </div>
  );
}

export default ProjectSection;
