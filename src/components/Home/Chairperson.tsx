"use client";
import { Users } from "@/models/user.model";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpeechSection from "./SpeechSection";

const Chairperson = () => {
  const [chair, setChair] = useState<Users | null>(null);

  useEffect(() => {
    axios
      .get("/api/users?position=Chairperson")
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : [];
        setChair(users.find((user: Users) => user.name === "Md. Mutasim Billah") || users[0] || null);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Something went wrong fetching Chairperson");
      });
  }, []);

  if (!chair) return null;

  return (
    <SpeechSection
      user={chair}
      title="Vision of the Chairperson"
      badgeText="Student Leadership"
      badgeIcon="tie"
      reverse={true}
      bgClass="bg-base-200/50"
      quote="The IEEE Rajshahi University Student Branch (RUSB), founded in July 2017, serves as a cornerstone for technical excellence and professional development."
      secondaryQuote="Our purpose is to bridge the worlds of academia and industry, helping students learn from faculty members, seasoned professionals, and fellow innovators. As Chairperson, I am committed to fostering an environment where every member can transform their ideas into impactful realities."
    />
  );
};

export default Chairperson;

