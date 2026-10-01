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

const advisorQuotes: Record<string, string> = {
  ras: "Mentoring students in robotics and automation is deeply rewarding. My goal as IEEE RAS Chapter Advisor is to connect our members with leading researchers and industry practitioners, so they can experience the full depth of what robotics engineering means in the 21st century.",
  sps: "Signal processing underpins technologies from medical imaging to wireless communications. As the IEEE SPS Chapter Advisor at RUSB, I encourage our members to develop strong mathematical intuition alongside practical engineering skills — a combination that opens doors worldwide.",
  pes: "The future of energy is renewable, distributed, and intelligent. As Advisor to the IEEE Power & Energy Society Chapter at RUSB, I provide guidance and resources to help students engage with the real challenges of grid modernization, energy efficiency, and sustainable power systems.",
  cs: "Computing is the universal language of the modern world. As IEEE CS Chapter Advisor, I am committed to helping students at RUSB develop not just coding skills, but the deeper problem-solving mindset that defines exceptional computer scientists and software engineers.",
  aps: "The study of antennas and electromagnetic waves is fundamental to wireless technology. Advising the IEEE APS Chapter at RUSB, I aim to inspire students to explore cutting-edge research in areas like 5G, IoT, and satellite communications — and contribute to Bangladesh's growing tech ecosystem.",
  wie: "Diversity is the engine of innovation. As the IEEE WIE Chapter Advisor at RUSB, I am dedicated to mentoring women in engineering, removing barriers, and ensuring our chapter remains a welcoming and empowering environment for every aspiring female technologist.",
};

interface SocietyAdvisorProps {
  society: string;
}

const SocietyAdvisor = ({ society }: SocietyAdvisorProps) => {
  const [advisor, setAdvisor] = useState<Users | null>(null);

  useEffect(() => {
    axios
      .get("/api/users", { params: { society, designation: "Advisor" } })
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
  const fallbackQuote = advisorQuotes[society] || `${advisor.name} brings valuable expertise and mentorship to IEEE ${acronym} RUSBC. Their guidance continues to inspire our members to push the boundaries of technical excellence.`;

  return (
    <SpeechSection
      user={advisor}
      title={`Message from ${acronym} Advisor`}
      badgeIcon="grad"
      reverse={false}
      bgClass="bg-base-200/50"
      quote={fallbackQuote}
    />
  );
};

export default SocietyAdvisor;
