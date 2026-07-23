import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import profile from "@/data/profile";
import { GitHubLogoIcon, LinkedInLogoIcon, StackIcon } from "@radix-ui/react-icons";
import { FileTextIcon } from "lucide-react";
import Link from "next/link";

function SocialList() {
  return (
    <ButtonGroup aria-label="Social links" className="mx-auto md:mx-0">
      <Button asChild variant="outline" size="icon">
        <Link href={profile.links.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" title="X">
          <span aria-hidden className="font-semibold">
            𝕏
          </span>
        </Link>
      </Button>
      <Button asChild variant="outline" size="icon">
        <Link href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
          <GitHubLogoIcon />
        </Link>
      </Button>
      <Button asChild variant="outline" size="icon">
        <Link href={profile.links.stackoverflow} target="_blank" rel="noopener noreferrer" aria-label="Stack Overflow" title="Stack Overflow">
          <StackIcon />
        </Link>
      </Button>
      <Button asChild variant="outline" size="icon">
        <Link href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
          <LinkedInLogoIcon />
        </Link>
      </Button>
      <Button asChild variant="outline" size="icon">
        <Link href="/resume" aria-label="Resume" title="Resume">
          <FileTextIcon />
        </Link>
      </Button>
    </ButtonGroup>
  );
}

export default SocialList;
