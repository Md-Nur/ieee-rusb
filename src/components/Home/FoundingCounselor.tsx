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
      badgeText="Founding Leadership"
      badgeIcon="grad"
      bgClass="bg-base-100"
      quote="It is a matter of great pride to see how IEEE RUSB has grown since its inception. Our goal was to create a platform for students to excel beyond text books, and seeing that vision come to life is truly rewarding."
    />
  );
};

export default FoundingCounselor;
