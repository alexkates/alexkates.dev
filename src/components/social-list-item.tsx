import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function SocialListItem({ children }: Props) {
  return <li className="flex items-center gap-1 hover:underline">{children}</li>;
}
