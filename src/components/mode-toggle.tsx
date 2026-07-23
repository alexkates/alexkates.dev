"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="border-0 hover:bg-background"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <SunIcon aria-hidden="true" className="scale-100 dark:scale-0" />
      <MoonIcon aria-hidden="true" className="absolute scale-0 dark:scale-100" />
    </Button>
  );
}
