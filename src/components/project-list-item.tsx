import Project from "@/types/project";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

type Props = {
  project: Project;
  priority?: boolean;
};

export default function ProjectItem({ project, priority = false }: Props) {
  return (
    <li className="min-w-0">
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="flex h-full flex-col overflow-hidden rounded-2xl bg-muted/20 shadow-none transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:-translate-y-1 group-hover:border-foreground/20 group-hover:shadow-lg">
          <CardHeader className="flex-1 gap-2 p-5">
            <CardTitle className="flex items-start justify-between gap-3 text-lg leading-snug">
              <span>{project.name}</span>
              <ArrowUpRightIcon
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-muted-foreground transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              />
            </CardTitle>
            <CardDescription className="text-pretty leading-6">{project.description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto p-3 pt-0">
            <div className="aspect-[1.9/1] w-full overflow-hidden rounded-xl border">
              <Image
                alt={project.image.alt ?? project.name}
                src={project.image.src}
                className="size-full object-cover"
                width={project.image.width}
                height={project.image.height}
                sizes="(min-width: 768px) 320px, calc(100vw - 56px)"
                priority={priority}
              />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
}
