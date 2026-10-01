"use client";
import { Users } from "@/models/user.model";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpeechSection from "./SpeechSection";

const FoundingChairperson = () => {
  const [chair, setChair] = useState<Users | null>(null);

  useEffect(() => {
    axios
      .get("/api/users?query=Hossain Md. Sabir")
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : [];
        const user = users.find((u: Users) => u.name.includes("Hossain Md. Sabir")) || users[0] || null;
        setChair(user);
      })
      .catch((err) => {
        console.error("Error fetching Founding Chairperson:", err);
      });
  }, []);

  if (!chair) return null;

  return (
    <SpeechSection
      user={chair}
      title="Message from Founding Chairperson"
      badgeIcon="tie"
      reverse={true}
      bgClass="bg-base-200/50"
      quote="When we founded IEEE RUSB in July 2017, we dared to dream of a student community that could stand shoulder to shoulder with the finest IEEE branches in the country. Every event we organized, every workshop we ran, and every member we welcomed was a step toward that dream. I am immensely proud of how far this branch has come."
      secondaryQuote="To every future leader of RUSB — carry the founding spirit forward. Build boldly, collaborate genuinely, and never stop believing in the power of engineering to change the world."
    />
  );
};

export default FoundingChairperson;
