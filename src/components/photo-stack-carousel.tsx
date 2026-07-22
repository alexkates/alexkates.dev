"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const photos = [
  { src: "/about/zion-hike.webp", alt: "Alex hiking above Zion Canyon" },
  { src: "/about/ireland-cliffs.webp", alt: "Alex at the Cliffs of Moher in the rain" },
  { src: "/about/rock-climbing.webp", alt: "Alex rock climbing outdoors" },
  { src: "/about/sedona-hike.webp", alt: "Alex hiking among the red rocks in Sedona" },
  { src: "/about/mauna-kea.webp", alt: "Alex at the summit of Mauna Kea" },
  { src: "/about/yosemite-river.webp", alt: "Alex beside a river in Yosemite" },
  { src: "/about/haleakala.webp", alt: "Alex hiking through Haleakala crater" },
] as const;

const positions = [
  "z-30 translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100",
  "z-20 translate-x-3 translate-y-3 rotate-[1.5deg] scale-[0.97] opacity-80 sm:translate-x-5",
  "z-10 translate-x-6 translate-y-6 rotate-[3deg] scale-[0.94] opacity-55 sm:translate-x-10",
] as const;

export default function PhotoStackCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  function move(direction: number) {
    setActiveIndex((current) => (current + direction + photos.length) % photos.length);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-3 pb-8 sm:px-6">
      <div className="relative aspect-[4/3]">
        {photos.map((photo, index) => {
          const position = (index - activeIndex + photos.length) % photos.length;

          return (
            <div
              key={photo.src}
              aria-hidden={position !== 0}
              className={cn(
                "absolute inset-0 overflow-hidden rounded-[2rem] border-4 border-background bg-muted shadow-2xl transition-all duration-500 ease-out",
                position < positions.length ? positions[position] : "pointer-events-none scale-90 opacity-0",
              )}
            >
              <Image
                src={photo.src}
                alt={position === 0 ? photo.alt : ""}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 768px, 95vw"
                className="object-cover"
              />
              {position === 0 ? <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" /> : null}
            </div>
          );
        })}
      </div>

      <div className="relative z-40 mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous photo"
          className="grid size-11 place-items-center rounded-full border bg-background shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-muted"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="min-w-16 text-center font-mono text-xs text-muted-foreground" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next photo"
          className="grid size-11 place-items-center rounded-full border bg-background shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-muted"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
