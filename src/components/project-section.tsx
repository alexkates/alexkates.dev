"use client";

import projects from "@/data/projects";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

function ProjectSection() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <div className="mt-8 flex flex-col gap-2 items-center">
      <div className="flex items-center text-xl w-full">
        <span className="font-medium">Work I&apos;m proud of</span>
      </div>
      <Carousel plugins={[plugin.current]} className="" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.play}>
        <CarouselContent className="rounded-lg">
          {projects.map((project) => (
            <CarouselItem key={project.name}>
              <Link href={project.url} target="_blank">
                <Image
                  src={project.image}
                  alt={project.description}
                  width={project.image.width}
                  height={project.image.height}
                  className="hover:scale-105 duration-200 cursor-pointer rounded-lg border-solid"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}

export default ProjectSection;
