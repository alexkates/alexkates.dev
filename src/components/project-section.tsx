import projects from "@/data/projects";
import ProjectList from "./project-list";

function ProjectSection() {
  return (
    <div className="mt-8 flex flex-col gap-2 items-center">
      <div className="flex items-center text-xl w-full">
        <span className="font-medium">Work I&apos;m proud of</span>
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}

export default ProjectSection;
