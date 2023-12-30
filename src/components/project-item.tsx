import { cn } from "@/lib/utils";
import Project from "@/types/project";
import Image from "next/image";
import Link from "next/link";

type Props = {
  project: Project;
};

export default function ProjectItem({ project }: Props) {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  return (
    <li className={cn("flex flex-col items-center rounded-lg", fadeIn)}>
      <div className="transition-transform duration-300 ease-in-out hover:scale-105 flex flex-col gap-1">
        <Link href={project.url} target="_blank">
          <Image alt={project.name} src={project.image.src} className="rounded-lg" width={1200} height={630} />
        </Link>
        <div className="flex flex-col">
          <span className="text-lg font-medium">{project.name}</span>
          <p className="text-xs leading-tight text-gray-700 dark:text-gray-300">{project.description}</p>
        </div>
      </div>
    </li>
  );
}
