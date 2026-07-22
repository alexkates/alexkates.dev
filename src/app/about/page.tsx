import Bio from "@/components/bio";
import SocialList from "@/components/social-list";
import profile from "@/data/profile";
import { cn, fadeIn } from "@/lib/utils";
import Image from "next/image";

const photos = [
  { src: "/about/zion-hike.webp", alt: "Alex hiking above Zion Canyon", className: "col-span-2 row-span-2" },
  { src: "/about/ireland-cliffs.webp", alt: "Alex at the Cliffs of Moher in the rain", className: "row-span-2" },
  { src: "/about/rock-climbing.webp", alt: "Alex rock climbing outdoors", className: "row-span-2" },
  { src: "/about/sedona-hike.webp", alt: "Alex hiking among the red rocks in Sedona", className: "col-span-2" },
  { src: "/about/mauna-kea.webp", alt: "Alex at the summit of Mauna Kea", className: "col-span-2" },
  { src: "/about/yosemite-river.webp", alt: "Alex beside a river in Yosemite", className: "col-span-2" },
  { src: "/about/haleakala.webp", alt: "Alex hiking through Haleakala crater", className: "col-span-2" },
] as const;

export default function Page() {
  return (
    <main className="space-y-12 pb-8">
      <section className={cn(fadeIn, "animation-delay-200 grid items-center gap-8 md:grid-cols-[minmax(220px,0.8fr)_2fr]")}>
        <div className="relative mx-auto aspect-square w-full max-w-72 overflow-hidden rounded-3xl border bg-muted shadow-sm md:mx-0">
          <Image src="/headshot.png" alt="Alex Kates" fill priority sizes="(min-width: 768px) 288px, 70vw" className="object-cover" />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">About me</p>
            <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{profile.headline}</h1>
          </div>
          <Bio />
          <SocialList />
        </div>
      </section>

      <section className={cn(fadeIn, "animation-delay-400 space-y-4 border-t pt-8")}>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Out there</p>
        <div className="grid auto-rows-[10rem] grid-cols-2 gap-3 md:auto-rows-[12rem] md:grid-cols-4">
          {photos.map((photo, index) => (
            <div key={photo.src} className={cn("relative overflow-hidden rounded-2xl bg-muted", photo.className)}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      </section>

      <section className={cn(fadeIn, "animation-delay-400 space-y-4 border-t pt-8")}>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Usually into</p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {profile.interests.map((interest, index) => (
            <li key={interest} className="rounded-2xl border bg-muted/30 p-4">
              <span className="text-xs text-muted-foreground">0{index + 1}</span>
              <p className="mt-6 font-medium">{interest}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
