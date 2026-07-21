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

interface SocietyAdvisorProps {
  society: string;
}

const SocietyAdvisor = ({ society }: SocietyAdvisorProps) => {
  const [advisor, setAdvisor] = useState<Users | null>(null);

  useEffect(() => {
    axios
      .get(`/api/users?society=${society}&position=Advisor`)
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : [];
        setAdvisor(users[0] || null);
      })
      .catch((err) => {
        console.error(`Error fetching ${society} Advisor:`, err);
      });
  }, [society]);

  if (!advisor) return null;

  const acronym = societyAcronyms[society] || society.split("-")[0].toUpperCase();

  return (
    <SpeechSection
      user={advisor}
      title={`Message from ${acronym} Advisor`}
      badgeText={`${acronym} Mentorship`}
      badgeIcon="grad"
      reverse={false}
      bgClass="bg-base-200/50"
      quote={`${advisor.name} brings valuable expertise and mentorship to IEEE ${acronym} RUSBC. Their guidance continues to inspire our members to push the boundaries of technical excellence.`}
    />
  );
};

export default SocietyAdvisor;
