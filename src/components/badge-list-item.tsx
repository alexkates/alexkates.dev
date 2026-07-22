import { HashnodeBadge } from "@/data/hashnode-badges";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type Props = {
  badge: HashnodeBadge;
};

export default function BadgeListItem({ badge }: Props) {
  return (
    <li>
      <Card>
        <CardHeader>
          <div className="py-2">
            <Image width={50} height={50} alt={badge.image} src={badge.image} />
          </div>
          <CardTitle>{badge.name}</CardTitle>
          <CardDescription>{new Date(badge.awardedAt).toLocaleDateString(undefined, { timeZone: "UTC" })}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <span className="min-h-16 text-sm">{badge.description}</span>
        </CardContent>
      </Card>
    </li>
  );
}
