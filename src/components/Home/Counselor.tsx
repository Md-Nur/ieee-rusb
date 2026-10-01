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
      badgeIcon="grad"
      quote="IEEE RUSB was established to create a bridge between academic learning and professional excellence. As Branch Counselor, my role is to ensure that every student finds in this branch a space to grow — not just technically, but as responsible future leaders of society. I encourage all members to participate actively, collaborate openly, and make the most of the opportunities IEEE provides."
      secondaryQuote="Together, let us build a branch that not only advances technology but also shapes character, fosters teamwork, and leaves a meaningful legacy for every generation that follows."
    />
  );
};

export default Counselor;
