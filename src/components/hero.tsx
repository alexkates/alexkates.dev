import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className={"flex items-center text-xl"}>
        <span className="mr-1 animate-wave animation-delay-1000">👋</span>
        <span className="font-medium">Hi, I&apos;m Alex.</span>
      </div>
      <p className="prose prose-neutral dark:prose-invert">
        I&apos;m a{" "}
        <Link href="https://leerob.io/blog/product-engineers" target="_blank" className="underline">
          product engineer
        </Link>{" "}
        currently working at{" "}
        <Link href="https://croissant.com?utm_source=alexkates.dev" target="_blank" className="underline">
          Croissant
        </Link>{" "}
        as Director of Engineering.
      </p>
    </>
  );
}
