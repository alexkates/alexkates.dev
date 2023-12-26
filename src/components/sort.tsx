"use client";

import { SortAsc } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {};

function Sort() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = useDebouncedCallback((sort: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <SortAsc className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={searchParams.get("sort")?.toString()} onValueChange={handleSort}>
          <DropdownMenuRadioItem value="published date">Published Date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="views">Views</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Sort;
