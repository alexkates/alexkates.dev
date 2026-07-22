import profile from "@/data/profile";
import { GitHubLogoIcon, LinkedInLogoIcon, StackIcon } from "@radix-ui/react-icons";
import { FileTextIcon } from "lucide-react";
import SocialListItem from "./social-list-item";

const iconDimensions = { width: 16, height: 16 };

function SocialList() {
  return (
    <ul className="flex flex-wrap gap-2">
      <SocialListItem href={profile.links.twitter} label="X" external>
        <span aria-hidden className="w-4 text-center font-semibold">
          𝕏
        </span>
      </SocialListItem>
      <SocialListItem href={profile.links.github} label="GitHub" external>
        <GitHubLogoIcon {...iconDimensions} />
      </SocialListItem>
      <SocialListItem href={profile.links.stackoverflow} label="Stack Overflow" external>
        <StackIcon {...iconDimensions} />
      </SocialListItem>
      <SocialListItem href={profile.links.linkedin} label="LinkedIn" external>
        <LinkedInLogoIcon {...iconDimensions} />
      </SocialListItem>
      <SocialListItem href="/resume" label="Resume">
        <FileTextIcon {...iconDimensions} />
      </SocialListItem>
    </ul>
  );
}

export default SocialList;
