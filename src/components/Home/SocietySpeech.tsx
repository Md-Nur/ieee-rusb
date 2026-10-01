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

const societyQuotes: Record<string, string> = {
  ras: "As Chairperson of the IEEE Robotics & Automation Society Chapter at RUSB, I am passionate about cultivating the next generation of robotics engineers. Our chapter is committed to hands-on learning, cutting-edge research exposure, and building a community where automation meets creativity.",
  sps: "Signal processing is at the heart of modern communication and AI. Leading the IEEE Signal Processing Society Chapter at RUSB, I aim to create an environment where students can explore the mathematics and engineering behind the signals that power our world — from audio to images to neural data.",
  pes: "The energy transition is the defining engineering challenge of our generation. As Chairperson of the IEEE Power & Energy Society Chapter at RUSB, I am dedicated to equipping our members with the knowledge and skills to design smarter, greener, and more resilient power systems for Bangladesh and beyond.",
  cs: "Software and computing shape every aspect of modern life. At the IEEE Computer Society Chapter of RUSB, our mission is to foster deep technical skills in areas like algorithms, systems, and AI — while building the collaborative mindset that great software teams demand.",
  aps: "Antenna and propagation technologies are the invisible infrastructure of the connected world. As Chairperson of the IEEE Antennas & Propagation Society Chapter at RUSB, I strive to make electromagnetic engineering exciting, accessible, and directly applicable to the real-world challenges our members will face in their careers.",
  wie: "Women in Engineering are catalysts for a more innovative and inclusive technology landscape. As Chairperson of IEEE WIE at RUSB, I am committed to creating a space where every female member is empowered to lead, inspire, and break boundaries — both in engineering and beyond.",
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
  const fallbackQuote = societyQuotes[society] || `As the Chairperson of IEEE ${acronym} RUSBC, I am proud to lead a community of passionate individuals dedicated to the advancement of technology. Our goal is to provide a platform for innovation and growth.`;

  return (
    <SpeechSection
      user={chair}
      title={`Message from ${acronym} Chairperson`}
      badgeIcon="tie"
      reverse={true}
      bgClass="bg-base-100"
      quote={fallbackQuote}
    />
  );
};

export default SocietySpeech;
