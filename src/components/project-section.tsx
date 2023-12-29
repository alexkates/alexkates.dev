import projects from "@/data/projects";
import ProjectList from "./project-list";

function ProjectSection() {
  return (
    <div className="mt-8 flex flex-col gap-2">
      <p className="prose prose-neutral dark:prose-invert">Here are some of the projects I&apos;ve worked on.</p>
      <ProjectList projects={projects} />
    </div>
  );
}

export default ProjectSection;
