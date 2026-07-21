"use client";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";

const societies = [
  { value: "", label: "All Societies" },
  { value: "ras", label: "RAS" },
  { value: "sps", label: "SPS" },
  { value: "pes", label: "PES" },
  { value: "cs", label: "CS" },
  { value: "aps", label: "APS" },
  { value: "wie", label: "WIE" },
  { value: "main", label: "Main Branch" },
];

const AllEvents = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const society = searchParams.get("society") || "";

  const handleChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("society", value);
    } else {
      params.delete("society");
    }
    router.replace(`/all-events?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-7xl mx-auto px-4 md:px-10 pt-8">
        <Title className="!my-0 !p-0">All Events</Title>
        <select
          value={society}
          onChange={(e) => handleChange(e.target.value)}
          className="select select-bordered select-sm w-full max-w-xs"
        >
          {societies.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      {/* @ts-ignore */}
      <ShowContents query="event" society={society} hideIfEmpty={false} limit={9} />
    </div>
  );
};

export default AllEvents;
