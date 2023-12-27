import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col">
      <h2 className="">About me</h2>
      <p>
        I&apos;m a{" "}
        <Link className="underline" href="https://leerob.io/blog/product-engineers?ref=alexkates.dev">
          product engineer
        </Link>{" "}
        and{" "}
        <Link className="underline" href="https://ammar-hakim.org/sj/pn/pn0/pn0-minimalism.html?ref=alexkates.dev">
          software minimalist
        </Link>{" "}
        currently working at{" "}
        <Link className="underline" href="https://croissant.com?ref=alexkates.dev">
          Croissant
        </Link>{" "}
        as Director of Engineering.
      </p>
    </section>
  );
}
