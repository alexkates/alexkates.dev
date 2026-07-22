import profile from "@/data/profile";
import { GitHubLogoIcon, LinkedInLogoIcon, StackIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { FileTextIcon } from "lucide-react";
import Link from "next/link";
import SocialListItem from "./social-list-item";

const iconDimensions = { width: 14, height: 14 };

function SocialList() {
  return (
    <ul className="flex flex-col justify-evenly">
      <SocialListItem>
        <TwitterLogoIcon {...iconDimensions} />
        <Link href={profile.links.twitter} target="_blank">
          twitter
        </Link>
      </SocialListItem>
      <SocialListItem>
        <GitHubLogoIcon {...iconDimensions} />
        <Link href={profile.links.github} target="_blank">
          github
        </Link>
      </SocialListItem>
      <SocialListItem>
        <StackIcon {...iconDimensions} />
        <Link href={profile.links.stackoverflow} target="_blank">
          stackoverflow
        </Link>
      </SocialListItem>
      <SocialListItem>
        <LinkedInLogoIcon {...iconDimensions} />
        <Link href={profile.links.linkedin} target="_blank">
          linkedin
        </Link>
      </SocialListItem>
      <SocialListItem>
        <FileTextIcon {...iconDimensions} />
        <Link href="/resume">resume</Link>
      </SocialListItem>
    </ul>
  );
}

export default SocialList;
