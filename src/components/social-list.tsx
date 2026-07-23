import { Button } from "@/components/ui/button";
import profile from "@/data/profile";
import { ArrowTopRightIcon, FileTextIcon, GitHubLogoIcon, LinkedInLogoIcon, StackIcon } from "@radix-ui/react-icons";
import Link from "next/link";

function SocialList() {
  return (
    <nav aria-label="Social links" className="mx-auto grid w-full max-w-64 grid-cols-2 gap-2 md:mx-0">
      <Button asChild variant="outline" className="col-span-2 h-11 justify-between px-3">
        <Link href={profile.links.github} target="_blank" rel="noopener noreferrer">
          <span className="flex items-center gap-2">
            <GitHubLogoIcon data-icon="inline-start" />
            GitHub
          </span>
          <ArrowTopRightIcon data-icon="inline-end" />
        </Link>
      </Button>
      <Button asChild variant="outline" className="h-11 justify-start px-3">
        <Link href={profile.links.twitter} target="_blank" rel="noopener noreferrer">
          <span aria-hidden className="font-semibold">
            𝕏
          </span>
          <span>X.com</span>
        </Link>
      </Button>
      <Button asChild variant="outline" className="h-11 justify-start px-3">
        <Link href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedInLogoIcon data-icon="inline-start" />
          LinkedIn
        </Link>
      </Button>
      <Button asChild variant="outline" className="h-11 justify-start px-3">
        <Link href={profile.links.stackoverflow} target="_blank" rel="noopener noreferrer">
          <StackIcon data-icon="inline-start" />
          Stack
        </Link>
      </Button>
      <Button asChild variant="secondary" className="h-11 justify-start px-3">
        <Link href="/resume">
          <FileTextIcon data-icon="inline-start" />
          Resume
        </Link>
      </Button>
    </nav>
  );
}

export default SocialList;
