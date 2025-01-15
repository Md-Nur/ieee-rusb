"use client";
import Check from "@/components/Form/Check";
import Title from "@/components/Title";
import { useJoin } from "@/context/join";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Join3 = () => {
  const { user, setUser } = useJoin();
  const [committee, setCommittee] = useState([]);
  const router = useRouter();

  const handleChecked = (e) => {
    if (e.target.checked) {
      setCommittee([...committee, e.target.value]);
    } else {
      setCommittee(committee.filter((item) => item !== e.target.value));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (committee.length) {
      setUser({ ...user, roles: committee });
    } else {
      toast.dismiss();
      toast.error("Please select at least one society");
    }
    router.push("/join/4");
  };
  return (
    <div>
      <Title>Select Committee</Title>
      <form
        className="flex flex-col max-w-52 mx-auto gap-3"
        onSubmit={handleSubmit}
      >
        <Check name="executive-committee" handleChecked={handleChecked} />
        <Check name="faculty-member" handleChecked={handleChecked} />
        <Check name="student-member" handleChecked={handleChecked} />
        <Check name="gradute-member" handleChecked={handleChecked} />
        <Check name="alumni" handleChecked={handleChecked} />
        <div className="flex w-full items-center justify-between">
          <Link href="/join/2" type="reset" className="btn btn-accent">
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

export default Join3;
