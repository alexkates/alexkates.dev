import Project from "@/types/project";
import ProjectListItem from "./project-list-item";

type Props = {
  projects: Project[];
};

function ProjectList({ projects }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectListItem key={project.name} project={project} />
      ))}
    </ul>
  );
}

export default ProjectList;
