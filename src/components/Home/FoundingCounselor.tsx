"use client";
import { Users } from "@/models/user.model";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpeechSection from "./SpeechSection";

const FoundingCounselor = () => {
  const [counselor, setCounselor] = useState<Users | null>(null);

  useEffect(() => {
    axios
      .get("/api/users?query=Shamim Ahmad")
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : [];
        const user = users.find((u: Users) => u.name.includes("Shamim Ahmad")) || users[0] || null;
        setCounselor(user);
      })
      .catch((err) => {
        console.error("Error fetching Founding Counselor:", err);
      });
  }, []);

  if (!counselor) return null;

  return (
    <SpeechSection
      user={counselor}
      title="Message from Founding Counselor"
      badgeIcon="grad"
      bgClass="bg-base-100"
      quote="The founding of IEEE RUSB was driven by a simple but powerful belief: that students at the University of Rajshahi deserve a world-class platform to develop their technical and professional skills. Watching this branch grow from an idea into a thriving community of hundreds of passionate members has been among the most fulfilling experiences of my academic career."
      secondaryQuote="My advice to every member — engage with the global IEEE community, publish your work, present your ideas, and use this branch as a launchpad for a lifetime of contributions to engineering and science."
    />
  );
};

export default FoundingCounselor;
