"use client";
import Check from "@/components/Form/Check";
import Title from "@/components/Title";
import { useJoin } from "@/context/join";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Join4 = () => {
  const { user, setUser } = useJoin();
  const [societies, setSocieties] = useState([]);
  const router = useRouter();

  const handleChecked = (e) => {
    if (e.target.checked) {
      setSocieties([...societies, e.target.value]);
    } else {
      setSocieties(societies.filter((item) => item !== e.target.value));
    }
  };
  const handleSubmit = async (e) => {
    toast.loading("Please wait...");
    e.preventDefault();
    if (societies.length) {
      setUser({ ...user, societies: societies });
    }
    try {
      const res = await axios.post("/api/register", user);
      toast.dismiss();
      if (res.status >= 400) {
        toast.error(res?.response?.data?.error || "Something went wrong");
      }
      toast.success("Registration successful! Plase login after approval");
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.error || error?.message);
    }
    router.push("/");
  };
  return (
    <div>
      <Title>Select Societies</Title>
      <form
        className="flex flex-col max-w-60 mx-auto gap-3"
        onSubmit={handleSubmit}
      >
        <Check name="signal-processing-society" handleChecked={handleChecked} />
        <Check name="power-&-energy-society" handleChecked={handleChecked} />
        <Check
          name="robotics-&-automation-society"
          handleChecked={handleChecked}
        />
        <Check name="computer-society" handleChecked={handleChecked} />
        <Check
          name="antenna-&-propagation-society"
          handleChecked={handleChecked}
        />
        <Check
          name="woman-in-engineering-society"
          handleChecked={handleChecked}
        />
        <div className="flex w-full items-center justify-between">
          <Link href="/join/3" type="reset" className="btn btn-accent">
            Previous
          </Link>
          <button type="submit" className="btn btn-accent">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join4;
