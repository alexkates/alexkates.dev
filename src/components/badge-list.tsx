import hashnodeBadges from "@/data/hashnode-badges";
import BadgeListItem from "./badge-list-item";

export default function BadgeList() {
  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {hashnodeBadges.map((badge) => (
        <BadgeListItem key={badge.id} badge={badge} />
      ))}
    </ul>
  );
}
