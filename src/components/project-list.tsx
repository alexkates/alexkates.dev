import Project from "@/types/project";
import ProjectListItem from "./project-list-item";

type Props = {
  projects: Project[];
};

function ProjectList({ projects }: Props) {
  if (projects.length === 0) {
    return <p className="rounded-2xl border bg-muted/20 p-6 text-sm text-muted-foreground">No projects to show yet.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectListItem key={project.name} project={project} priority={index < 2} />
      ))}
    </ul>
  );
}

export default ProjectList;
