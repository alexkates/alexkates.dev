import Bio from "@/components/bio";
import PhotoStackCarousel from "@/components/photo-stack-carousel";
import SocialList from "@/components/social-list";
import profile from "@/data/profile";
import { cn, fadeIn } from "@/lib/utils";
import Image from "next/image";

export default function Page() {
  return (
    <main className="space-y-12 pb-8">
      <section className={cn(fadeIn, "animation-delay-200 grid items-start gap-8 rounded-[2rem] border bg-muted/20 p-5 sm:p-7 md:grid-cols-[minmax(220px,0.8fr)_2fr]")}>
        <div className="space-y-5 md:-mt-2">
          <div className="relative mx-auto aspect-square w-full max-w-64 overflow-hidden rounded-3xl border bg-muted shadow-sm md:mx-0">
            <Image src="/headshot.png" alt="Alex Kates" fill priority sizes="(min-width: 768px) 256px, 70vw" className="object-cover" />
          </div>
          <SocialList />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">About me</p>
            <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{profile.headline}</h1>
          </div>
          <Bio />
        </div>
      </section>

      <section className={cn(fadeIn, "animation-delay-400 border-t pt-10")}>
        <PhotoStackCarousel />
      </section>
    </main>
  );
}
