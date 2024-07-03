import { cn } from "@/lib/utils";
import Project from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

type Props = {
  project: Project;
};

export default function ProjectItem({ project }: Props) {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  return (
    <li className={cn("flex flex-col items-center", fadeIn)}>
      <Link href={project.url} target="_blank">
        <Card className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.025]">
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Image alt={project.name} src={project.image.src} className="rounded-md" width={1200} height={630} priority={true} />
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
}
