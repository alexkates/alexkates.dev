"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks } from "./main-nav";

export default function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path.split("?")[0];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation" className="rounded-full md:hidden">
          <svg aria-hidden="true" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3 19H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {navLinks.map(
              (navLink) =>
                navLink.href && (
                  <MobileLink
                    key={navLink.href}
                    href={navLink.href}
                    onOpenChange={setOpen}
                    className={cn("rounded-lg px-3 py-2 text-lg hover:bg-muted", isActive(navLink.href) && "bg-muted font-medium")}
                  >
                    {navLink.label}
                  </MobileLink>
                ),
            )}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
