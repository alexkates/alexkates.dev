import ProjectList from "@/components/project-list";
import Projects from "@/data/projects";
import TopBlogPosts from "@/data/top-blog-posts";
import { getAllPosts } from "@/lib/blog";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const selected = [Projects[0], Projects[2], Projects[4], Projects[3]];
  const posts = getAllPosts();
  const writing = TopBlogPosts.slice(0, 3).flatMap((slug) => posts.find((post) => post.slug === slug) ?? []);
  return (
    <main>
      <section className="home-hero">
        <p className="eyebrow hero-eyebrow">
          <span className="status-dot" />
          Product engineer · Philadelphia
        </p>
        <h1>
          Alex
          <br />
          <span className="serif-word">Kates.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            I&apos;m a founding engineer at <a href="https://croissant.com">Croissant</a>.<br className="desktop-break" /> I work on our web app, iOS
            app, and browser extension.
          </p>
          <a className="round-link" href="#work" aria-label="Explore selected work">
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
        <div className="hero-note">
          <span>15 years of building software</span>
          <span>Previously at Credit Genie and PayPal</span>
        </div>
      </section>

      <section id="work" className="home-section" aria-labelledby="work-heading">
        <div className="section-top">
          <h2 id="work-heading">
            <span className="section-index">01</span>Selected work
          </h2>
          <Link className="text-link" href="/projects">
            All projects <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <ProjectList projects={selected} />
      </section>

      <section className="home-section writing-section" aria-labelledby="writing-heading">
        <div className="section-top">
          <h2 id="writing-heading">
            <span className="section-index">02</span>Writing
          </h2>
          <Link className="text-link" href="/blog">
            All writing <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div>
          {writing.map((post) => (
            <Link className="writing-row" key={post.slug} href={`/blog/${post.slug}`}>
              <time dateTime={post.publishedAt}>{new Date(post.publishedAt).getUTCFullYear()}</time>
              <h3>{post.title}</h3>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="outside-section" aria-labelledby="outside-heading">
        <div className="outside-copy">
          <h2 id="outside-heading">
            Outside of
            <br />
            <span className="serif-word">work.</span>
          </h2>
          <p>I travel, hike, and rock climb. These are a few photos from my trips.</p>
          <Link href="/about" className="text-link">
            About me <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <Link href="/about" className="photo-pair" aria-label="More about Alex and his travels">
          <figure className="travel-photo travel-photo-back">
            <Image
              src="/about/rock-climbing.webp"
              alt="Alex rock climbing outdoors"
              fill
              sizes="(max-width: 640px) 45vw, 250px"
              className="object-cover"
            />
          </figure>
          <figure className="travel-photo travel-photo-front">
            <Image
              src="/about/zion-hike.webp"
              alt="Alex hiking above Zion Canyon"
              fill
              sizes="(max-width: 640px) 50vw, 280px"
              className="object-cover"
            />
            <figcaption>Zion, Utah</figcaption>
          </figure>
        </Link>
      </section>
    </main>
  );
}
