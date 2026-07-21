"use client";
import { Users } from "@/models/user.model";
import axios from "axios";
import { useEffect, useState } from "react";
import SpeechSection from "./SpeechSection";

const societyAcronyms: Record<string, string> = {
  ras: "RAS",
  sps: "SPS",
  pes: "PES",
  cs: "CS",
  aps: "APS",
  wie: "WIE",
};

interface SocietySpeechProps {
  society: string;
}

const SocietySpeech = ({ society }: SocietySpeechProps) => {
  const [chair, setChair] = useState<Users | null>(null);

  useEffect(() => {
    axios
      .get("/api/users", { params: { society, designation: "Chairperson" } })
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : [];
        setChair(users[0] || null);
      })
      .catch((err) => {
        console.error(`Error fetching ${society} Chairperson:`, err);
      });
  }, [society]);

  if (!chair) return null;

  const acronym = societyAcronyms[society] || society.split("-")[0].toUpperCase();

  return (
    <SpeechSection
      user={chair}
      title={`Message from ${acronym} Chairperson`}
      badgeText={`${acronym} Leadership`}
      badgeIcon="tie"
      reverse={true}
      bgClass="bg-base-100"
      quote={`As the Chairperson of IEEE ${acronym} RUSBC, I am proud to lead a community of passionate individuals dedicated to the advancement of technology. Our goal is to provide a platform for innovation and growth.`}
    />
  );
};

export default SocietySpeech;
