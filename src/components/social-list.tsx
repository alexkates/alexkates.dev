import getUser from "@/server/get-user";
import { GitHubLogoIcon, LinkedInLogoIcon, Pencil1Icon, StackIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { FileTextIcon } from "lucide-react";
import Link from "next/link";
import SocialListItem from "./social-list-item";

const iconDimensions = { width: 14, height: 14 };

async function SocialList() {
  const me = await getUser();

  return (
    <ul className="flex flex-col justify-evenly">
      <SocialListItem>
        <TwitterLogoIcon {...iconDimensions} />
        <Link href={me?.socialMediaLinks?.twitter!} target="_blank">
          twitter
        </Link>
      </SocialListItem>
      <SocialListItem>
        <GitHubLogoIcon {...iconDimensions} />
        <Link href={me?.socialMediaLinks?.github!} target="_blank">
          github
        </Link>
      </SocialListItem>
      <SocialListItem>
        <StackIcon {...iconDimensions} />
        <Link href={me?.socialMediaLinks?.stackoverflow!} target="_blank">
          stackoverflow
        </Link>
      </SocialListItem>
      <SocialListItem>
        <LinkedInLogoIcon {...iconDimensions} />
        <Link href={me?.socialMediaLinks?.linkedin!} target="_blank">
          linkedin
        </Link>
      </SocialListItem>
      <SocialListItem>
        <Pencil1Icon {...iconDimensions} />
        <Link href="https://blog.alexkates.dev/" target="_blank">
          hashnode
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
