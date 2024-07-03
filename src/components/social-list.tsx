import getUser from "@/server/get-user";
import { GitHubLogoIcon, IdCardIcon, LinkedInLogoIcon, Pencil1Icon, StackIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import SocialListItem from "./social-list-item";

async function SocialList() {
  const me = await getUser();

  return (
    <ul className="flex flex-col justify-evenly">
      <SocialListItem>
        <TwitterLogoIcon />
        <Link href={me?.socialMediaLinks?.twitter!} target="_blank">
          twitter
        </Link>
      </SocialListItem>
      <SocialListItem>
        <GitHubLogoIcon />
        <Link href={me?.socialMediaLinks?.github!} target="_blank">
          github
        </Link>
      </SocialListItem>
      <SocialListItem>
        <StackIcon />
        <Link href={me?.socialMediaLinks?.stackoverflow!} target="_blank">
          stackoverflow
        </Link>
      </SocialListItem>
      <SocialListItem>
        <LinkedInLogoIcon />
        <Link href={me?.socialMediaLinks?.linkedin!} target="_blank">
          linkedin
        </Link>
      </SocialListItem>
      <SocialListItem>
        <Pencil1Icon />
        <Link href="https://blog.alexkates.dev/" target="_blank">
          hashnode
        </Link>
      </SocialListItem>
      <SocialListItem>
        <IdCardIcon />
        <Link href="/resume.pdf" target="_blank">
          resume
        </Link>
      </SocialListItem>
    </ul>
  );
}

export default SocialList;
