"use client";
import { Users } from "@/models/user.model";
import axios from "axios";
import { useEffect, useState } from "react";
import SpeechSection from "./SpeechSection";

const Advisors = () => {
  const [advisors, setAdvisors] = useState<Users[]>([]);

  useEffect(() => {
    axios
      .get("/api/users?position=Advisor")
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : [];
        setAdvisors(users.slice(0, 2));
      })
      .catch((err) => {
        console.error("Error fetching Advisors:", err);
      });
  }, []);

  if (!advisors.length) return null;

  return (
    <>
      {advisors[0] && (
        <SpeechSection
          user={advisors[0]}
          title="Message from Advisor"
          badgeText="Branch Leadership"
          badgeIcon="grad"
          bgClass="bg-base-100"
          quote={`${advisors[0].name} brings valuable expertise and mentorship to IEEE RUSB. Their guidance continues to inspire our members to push the boundaries of technical excellence.`}
        />
      )}
      {advisors[1] && (
        <SpeechSection
          user={advisors[1]}
          title="Message from Advisor"
          badgeText="Branch Leadership"
          badgeIcon="tie"
          reverse={true}
          bgClass="bg-base-200/50"
          quote={`${advisors[1].name} plays a pivotal role in shaping the vision and direction of IEEE RUSB. Their commitment to student development continues to elevate our branch to new heights.`}
        />
      )}
    </>
  );
};

export default Advisors;
