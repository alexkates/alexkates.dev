import Project from "@/types/project";
import ProjectItem from "./project-item";

type Props = {
  projects: Project[];
};

function ProjectList({ projects }: Props) {
  return (
    <ul className="grid gap-8 grid-cols-1 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectItem key={project.name} project={project} />
      ))}
    </ul>
  );
}

export default ProjectList;
