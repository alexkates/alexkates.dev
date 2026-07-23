import profile from "@/data/profile";

export default function Bio() {
  return (
    <div className="flex flex-col gap-4 text-base leading-7 text-muted-foreground sm:text-lg">
      {profile.bio.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
