"use client";

import { Users } from "@/models/user.model";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import { PiLinkedinLogoBold } from "react-icons/pi";
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
      <figure className="card-body md:max-h-96 h-full w-full md:max-w-96 p-4 m-4 sm:m-0 sm:p-0 rounded-xl ">
        <Image
          src={chair?.avatar || "/billaVai.jpg"}
          alt="Chairperson"
          width={300}
          height={300}
          className="object-cover rounded-xl md:rounded-none"
        />
      </figure>
      <div className="md:max-w-[calc(100%-400px)] flex flex-col justify-around h-full p-8 min-h-96">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{chair?.name}</h2>
            <p className="text-xl mt-0">{chair?.position || "Chairperson"}</p>
          </div>
          <div className="flex justify-between gap-2 items-center">
            {chair?.phone && (
              <a href={`tel:${chair?.phone}`} target="_blank">
                <MdOutlinePhone className="text-3xl text-accent" />
              </a>
            )}
            {chair?.email && (
              <a href={`mailto:${chair?.email}`} target="_blank">
                <MdOutlineMailOutline className="text-accent text-3xl" />
              </a>
            )}
            {chair?.linkedin && (
              <a href={chair?.linkedin} target="_blank">
                <PiLinkedinLogoBold className="text-accent text-3xl" />
              </a>
            )}
          </div>
        </div>
        <p className="text-justify">
          The IEEE Rajshahi University Student Branch (RUSB) was founded in July
          2017. <br /> The IEEE RUSB is a student branch of the Institute of
          Electrical and Electronics Engineers (IEEE). The IEEE was formed in
          1963 when the American Institute of Electrical Engineers (AIEE) and
          the Institute of Radio Engineers (IRE) merged. The IEEE RUSB&apos;s
          purpose is to help students learn from faculty members, professionals,
          and other students in the fields of electrical engineering and
          computer sciences.
        </p>
      </div>
    </div>
  );
};

export default Chairperson;
