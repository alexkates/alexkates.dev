import Project from "@/types/project";
import ProjectListItem from "./project-list-item";

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects.length) return <p>No projects to show yet.</p>;
  return (
    <ul className="project-grid">
      {projects.map((project, index) => (
        <ProjectListItem key={project.name} project={project} priority={index < 2} />
      ))}
    </ul>
  );
}
