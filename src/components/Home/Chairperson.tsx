"use client";

import { Users } from "@/models/user.model";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Chairperson = () => {
  const [chair, setChair] = useState<Users | null>(null);

  useEffect(() => {
    axios
      .get("/api/users?position=Chairperson")
      .then((res) => {
        setChair(res.data[0]);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Something went wrong");
      });
  }, []);
  return (
    <div className="card card-side md:bg-base-300 shadow-xl max-w-7xl mx-auto my-20 flex-wrap">
      <figure className="card-body md:max-h-96 h-full w-full md:max-w-96 p-3 m-3 sm:m-0 sm:p-0 rounded-xl ">
        <Image
          src={chair?.avatar || "/billaVai.jpg"}
          alt="Chairperson"
          width={300}
          height={300}
          className="object-cover rounded-xl md:rounded-none"
        />
      </figure>
      <div className="card-body w-[calc(100%-768px)]">
        <h2 className="text-2xl font-bold">{chair?.name}</h2>
        <p className="text-xl mt-0">{chair?.position || "Chairperson"}</p>
        <p className="text-justify">
          The IEEE Rajshahi University Student Branch (RU SB) was founded in
          July 2017. <br /> The IEEE RUSB is a student branch of the Institute
          of Electrical and Electronics Engineers (IEEE). The IEEE was formed in
          1963 when the American Institute of Electrical Engineers (AIEE) and
          the Institute of Radio Engineers (IRE) merged. The IEEE RU SB&apos;s
          purpose is to help students learn from faculty members, professionals,
          and other students in the fields of electrical engineering and
          computer sciences.
        </p>
      </div>
    </div>
  );
};

export default Chairperson;
