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
      badgeText="Founding Leadership"
      badgeIcon="tie"
      reverse={true}
      bgClass="bg-base-200/50"
      quote="The foundation of IEEE RUSB was laid with the hope of empowering every student with the tools they need to lead in the technical world. I am honored to have been part of its beginning."
    />
  );
};

export default FoundingChairperson;
