import Bio from "@/components/bio";
import SocialList from "@/components/social-list";
import { cn, fadeIn } from "@/lib/utils";
import Image from "next/image";

export default async function Page() {
  return (
    <main className="flex flex-col gap-4">
      <section className={cn(fadeIn, "animation-delay-200 flex gap-4")}>
        <Image src="/headshot.png" alt="A picture of me" width={175} height={175} />
        <SocialList />
      </section>
      <section className={cn(fadeIn, "animation-delay-400")}>
        <Bio />
      </section>
    </main>
  );
}
