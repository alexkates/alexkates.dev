"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function HeaderNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navs = [
    {
      href: "/",
      label: "home",
    },
    {
      href: "/blog",
      label: "blog",
    },
    {
      href: "/work",
      label: "work",
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navs.map((nav) => (
          <NavigationMenuItem key={nav.href}>
            <Button
              asChild
              variant="link"
              className={cn(isActive(nav.href) && "underline")}
            >
              <Link href={nav.href}>{nav.label}</Link>
            </Button>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
