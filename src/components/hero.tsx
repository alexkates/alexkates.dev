import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className={"flex items-center text-xl"}>
        <span className="mr-1 animate-wave animation-delay-1000">👋</span>
        <span className="font-medium">Hi, I&apos;m Alex.</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">
        I&apos;m a{" "}
        <Link href="https://leerob.io/blog/product-engineers" target="_blank" className="underline">
          product engineer
        </Link>{" "}
        and{" "}
        <Link href="https://ammar-hakim.org/sj/pn/pn0/pn0-minimalism.html" target="_blank" className="underline">
          software minimalist
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
