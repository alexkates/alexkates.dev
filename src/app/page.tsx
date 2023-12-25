import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold tracking-tight">Hello, world! I&apos;m Alex. 👋</h1>
      <p>
        I&apos;m a software developer, pragmatic minimalist, and lifelong learner. I currently working at{" "}
        <Link className="underline" href="https://croissant.com?ref=alexkates.dev">
          Croissant
        </Link>{" "}
        as the Director of Engineering.
      </p>
    </section>
  );
}
