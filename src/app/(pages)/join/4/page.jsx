"use client";
import Check from "@/components/Form/Check";
import Title from "@/components/Title";
import { useJoin } from "@/context/join";
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
    e.preventDefault();
    if (!societies.length) {
      toast.dismiss();
      toast.error("Please select at least one society");
    }
    setUser({ ...user, societies });
    router.push("/join/5");
  };
  return (
    <div>
      <Title>Select Societies</Title>
      <form
        className="flex flex-col max-w-60 mx-auto gap-3"
        onSubmit={handleSubmit}
      >
        <Check
          name="robotics-&-automation-society"
          handleChecked={handleChecked}
        />
        <Check name="signal-processing-society" handleChecked={handleChecked} />
        <Check name="power-&-energy-society" handleChecked={handleChecked} />
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
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join4;
