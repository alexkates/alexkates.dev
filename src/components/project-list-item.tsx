import Project from "@/types/project";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function ProjectItem({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <li className="project-item">
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
        <div className="project-image">
          <Image
            alt={project.image.alt ?? project.name}
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 1060px) 484px, (min-width: 640px) 46vw, 92vw"
            priority={priority}
          />
        </div>
        <div className="project-caption">
          <h3>{project.name}</h3>
          <ArrowUpRight aria-hidden="true" />
        </div>
        <p>{project.description}</p>
      </a>
    </li>
  );
}
