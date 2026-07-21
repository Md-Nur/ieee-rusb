"use client";
import { useState } from "react";
import ShowContents from "@/components/ShowContents";
import Title from "@/components/Title";

const societies = [
  { value: "", label: "All Societies" },
  { value: "robotics-&-automation-society", label: "RAS" },
  { value: "signal-processing-society", label: "SPS" },
  { value: "power-&-energy-society", label: "PES" },
  { value: "computer-society", label: "CS" },
  { value: "antenna-&-propagation-society", label: "APS" },
  { value: "women-in-engineering-society", label: "WIE" },
  { value: "main", label: "Main Branch" },
];

const AllEvents = () => {
  const [society, setSociety] = useState("");

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-7xl mx-auto px-4 md:px-10 pt-8">
        <Title className="!my-0 !p-0">All Events</Title>
        <select
          value={society}
          onChange={(e) => setSociety(e.target.value)}
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
