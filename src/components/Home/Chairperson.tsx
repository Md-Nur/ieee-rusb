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
      badgeIcon="tie"
      reverse={true}
      bgClass="bg-base-200/50"
      quote="Leading IEEE RUSB is not just a responsibility — it is a calling. Our branch is a community of passionate engineers and innovators who believe that knowledge shared is knowledge multiplied. In my tenure as Chairperson, I am committed to expanding our technical programs, strengthening inter-branch collaborations, and ensuring every member has a clear pathway to professional growth."
      secondaryQuote="I envision a RUSB where students don't just attend events but become agents of change — building projects that matter, solving problems that last, and inspiring the generations that follow."
    />
  );
};

export default Chairperson;
