import profile from "@/data/profile";
import { Mdx } from "./mdx";

export default function Bio() {
  return <Mdx code={profile.bio} />;
}
