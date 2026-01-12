"use client";
import Check from "@/components/Form/Check";
import Title from "@/components/Title";
import { useJoin } from "@/context/join";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const positions = [
  "Counselor",
  "Advisor",
  "Senior member",
  "Alumni",
  "Chairperson",
  "Vice Chair",
  "General Sec",
  "Ass GS",
  "Treasuerer",
  "Webmaster",
  "Programm coordinator",
  "Graphic Designer",
  "Content Development",
  "Membership Development",
  "Public Relation",
  "Photographer",
  "Publication coordinator",
  "Volunteer",
  "Other",
];

const societyList = [
  "robotics-&-automation-society",
  "signal-processing-society",
  "power-&-energy-society",
  "computer-society",
  "antenna-&-propagation-society",
  "women-in-engineering-society",
];

const Join4 = () => {
  const { user, setUser } = useJoin();
  const [societies, setSocieties] = useState([]);
  const [designations, setDesignations] = useState({});
  const router = useRouter();

  const handleChecked = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSocieties([...societies, value]);
    } else {
      setSocieties(societies.filter((item) => item !== value));
      const newDesignations = { ...designations };
      delete newDesignations[value];
      setDesignations(newDesignations);
    }
  };

  const handleDesignationChange = (society, designation) => {
    setDesignations({ ...designations, [society]: designation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!societies.length) {
      toast.dismiss();
      toast.error("Please select at least one society");
      return;
    }

    // Check if designations are selected for all selected societies
    for (const society of societies) {
      if (!designations[society]) {
        toast.error(`Please select a designation for ${society.split("-").join(" ")}`);
        return;
      }
    }

    const society_designations = societies.map(s => ({
      society: s,
      designation: designations[s]
    }));

    setUser({ ...user, societies, society_designations });
    router.push("/join/5");
  };

  return (
    <div className="card-body">
      <Title>Societies</Title>
      <form
        className="flex flex-col max-w-sm mx-auto gap-3"
        onSubmit={handleSubmit}
      >
        {societyList.map((society) => (
          <div key={society}>
            <Check
              name={society}
              handleChecked={handleChecked}
            />
            {societies.includes(society) && (
              <select
                className="select select-bordered select-accent w-full mt-1 ml-8 max-w-[calc(100%-2rem)]"
                value={designations[society] || ""}
                onChange={(e) => handleDesignationChange(society, e.target.value)}
                required
              >
                <option value="" disabled>Select Designation for {society.split("-").map(s => s[0].toUpperCase() + s.slice(1)).join(" ")}</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        
        <div className="flex w-full items-center justify-between mt-5">
          <Link href="/join/3-1" type="reset" className="btn btn-accent">
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
