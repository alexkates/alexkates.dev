"use client";

import Link from "next/link";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { SortTypes } from "@/types/sort-types";
import { usePathname } from "next/navigation";

export const navLinks = [
  {
    href: "/",
    label: "home",
  },
  {
    href: `/blog?${new URLSearchParams({
      sort: SortTypes.Date,
    }).toString()}`,
    label: "blog",
  },
  {
    href: "/projects",
    label: "projects",
  },
  {
    href: "/oss",
    label: "oss",
  },
  {
    href: "/about",
    label: "about",
  },
  {
    href: "/resume",
    label: "resume",
  },
] as const;

export default function MainNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path.split("?")[0];

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="sm:gap-4 gap-2">
        {navLinks.map((nav) => (
          <NavigationMenuItem key={nav.href}>
            <Link href={nav.href} className={cn(isActive(nav.href) && "underline", "hover:underline")}>
              {nav.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
