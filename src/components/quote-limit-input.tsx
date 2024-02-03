"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { Input } from "./ui/input";

const QuoteLimitInput = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set("limit", event.target.value);

    replace(`${pathname}?${params.toString()}`);
  }

  return <Input id="limit" type="number" onChange={onChange} placeholder="Number of quotes to fetch" />;
};

export default QuoteLimitInput;
