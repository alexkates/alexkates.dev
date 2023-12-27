"use client";

import { Project } from "@/types/Project";

type Props = {
  projects: Project[];
};

function ProjectList({ projects }: Props) {
  return (
    <div className="mt-8 flex flex-col">
      <div className="flex flex-row items-center text-xl">
        <span className="mr-1 animate-spin">💼</span>
        <span className="font-medium">Work I&apos;m proud of</span>
      </div>
    </div>
  );
}

export default ProjectList;
