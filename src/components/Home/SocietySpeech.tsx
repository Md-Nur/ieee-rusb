"use client";
import { Users } from "@/models/user.model";
import axios from "axios";
import { useEffect, useState } from "react";
import SpeechSection from "./SpeechSection";

const societyAcronyms: Record<string, string> = {
  "robotics-&-automation-society": "RAS",
  "signal-processing-society": "SPS",
  "power-&-energy-society": "PES",
  "computer-society": "CS",
  "antenna-&-propagation-society": "APS",
  "women-in-engineering-society": "WIE",
};

interface SocietySpeechProps {
  society: string;
}

const SocietySpeech = ({ society }: SocietySpeechProps) => {
  const [chair, setChair] = useState<Users | null>(null);

  useEffect(() => {
    // We need an API that can filter by society designation
    // For now, let's assume we can query by society and designation
    axios
      .get(`/api/users?society=${society}&designation=Chairperson`)
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
