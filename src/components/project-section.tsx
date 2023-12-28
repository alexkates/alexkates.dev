import projects from "@/data/projects";
import { Hammer } from "lucide-react";
import ProjectList from "./project-list";

function ProjectSection() {
  return (
    <div className="mt-8 flex flex-col gap-2 ">
      <div className={"flex items-center text-xl"}>
        <Hammer className="mr-1 animate-wave" />
        <span className="font-medium">Some products I&apos;ve built</span>
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}

export default ProjectSection;
