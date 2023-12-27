import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className={"flex flex-row items-center text-2xl"}>
        <span className="mr-1 animate-wave animation-delay-1000">👋</span>
        <h1 className="font-medium tracking-tighter">Hi, I&apos;m Alex.</h1>
      </div>
      <p className="prose prose-neutral dark:prose-invert">
        I&apos;m a{" "}
        <Link href="https://leerob.io/blog/product-engineers" target="_blank">
          product engineer
        </Link>{" "}
        and{" "}
        <Link href="https://ammar-hakim.org/sj/pn/pn0/pn0-minimalism.html" target="_blank">
          software minimalist
        </Link>{" "}
        currently working at{" "}
        <Link href="https://croissant.com?utm_source=alexkates.dev" target="_blank">
          Croissant
        </Link>{" "}
        as Director of Engineering.
      </p>
    </>
  );
}
