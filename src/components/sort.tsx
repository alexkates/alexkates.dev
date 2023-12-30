"use client";

import { SortTypes } from "@/types/sort-types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

function Sort() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortType = (sort: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>Sort by</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={searchParams.get("sort")?.toString()} onValueChange={handleSortType}>
          <DropdownMenuRadioItem value={SortTypes.Date}>Date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={SortTypes.Views}>Views</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Sort;
