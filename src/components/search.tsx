"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

type Props = {
  placeholder: string;
};

function Search({ placeholder }: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return <Input placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get("query")?.toString()} />;
}

export default Search;
