"use client";
import { Users } from "@/models/user.model";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpeechSection from "./SpeechSection";

const Counselor = () => {
  const [counselor, setCounselor] = useState<Users | null>(null);

  useEffect(() => {
    axios
      .get("/api/users?position=Counselor")
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : [];
        setCounselor(users.find((user: Users) => user.name === "Dr. Foez Ahmed") || users[0] || null);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Something went wrong fetching Counselor");
      });
  }, []);

  if (!counselor) return null;

  return (
    <SpeechSection
      user={counselor}
      title="Message from Branch Counselor"
      badgeText="Faculty Leadership"
      badgeIcon="grad"
      quote={`${counselor.name} is a dedicated Branch Counselor for IEEE RUSB. Under his visionary guidance, our branch has evolved into a powerhouse of technical innovation and student leadership at the University of Rajshahi.`}
    />
  );
};

export default Counselor;

