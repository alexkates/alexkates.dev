"use client";

import Link from "next/link";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { SortTypes } from "@/types/sort-types";
import { usePathname } from "next/navigation";

export const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: `/blog?${new URLSearchParams({
      sort: SortTypes.Date,
    }).toString()}`,
    label: "Blog",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/oss",
    label: "OSS",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/resume",
    label: "Résumé",
  },
] as const;

export default function MainNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path.split("?")[0];

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        {navLinks.map((nav) => (
          <NavigationMenuItem key={nav.href}>
            <Link
              href={nav.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive(nav.href) && "bg-muted font-medium",
              )}
            >
              {nav.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
