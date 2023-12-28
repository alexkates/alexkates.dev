"use client";

import projects from "@/data/projects";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

function ProjectCarousel() {
  const autoplayPlugin = useRef(Autoplay({ delay: 3000 }));

  return (
    <Carousel
      plugins={[autoplayPlugin.current, WheelGesturesPlugin()]}
      onMouseEnter={autoplayPlugin.current.stop}
      onMouseLeave={autoplayPlugin.current.play}
    >
      <CarouselContent>
        {projects.map((project) => (
          <CarouselItem key={project.name}>
            <Card className="p-2">
              <CardHeader className="prose dark:prose-invert prose-neutral">
                <h3>{project.name}</h3>
                <span>{project.description}</span>
              </CardHeader>
              <CardContent className="flex aspect-video items-center justify-center p-6 hover:scale-105 duration-200 cursor-pointer">
                <Link href={project.url} target="_blank">
                  <Image
                    src={project.image.src}
                    alt={project.description}
                    width={project.image.width}
                    height={project.image.height}
                    className="rounded-xl"
                  />
                </Link>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}

export default ProjectCarousel;
