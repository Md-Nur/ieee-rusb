"use client";
import Title from "@/components/Title";
import { useJoin } from "@/context/join";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Join31 = () => {
  const { user, setUser } = useJoin();
  const router = useRouter();

  function isValidSession(session) {
    const sessionRegex = /^\d{4}-\d{2}$/;

    // Check if it matches the basic pattern
    if (!sessionRegex.test(session)) return false;

    // Split the years and validate the sequence
    const [startYear, endYear] = session.split("-").map(Number);
    if (startYear < 1953) return false;
    if (startYear === 1999 && endYear === 0) return true;
    return endYear === (startYear % 100) + 1;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidSession(user.session) && user.session !== "") {
      toast.error("Invalid Session Format!");
      return;
    }
    if (user.dept === "") {
      toast.error("Please select department");
      return;
    }
    if (user.roles.includes("faculty-member") && user.designation === "") {
      toast.error("Please select designation");
      return;
    }
    router.push("/join/4");
  };
  return (
    <div className="card w-full max-w-sm shrink-0">
      <Title>
        Department & &nbsp;
        {user.roles.includes("faculty-member") ? "Designamtion" : "Session"}
      </Title>
      <form className="card-body mb-10" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Department</span>
          </label>
          <select
            className="select select-bordered select-accent mt-2"
            onChange={(e) => setUser({ ...user, dept: e.target.value })}
            required
          >
            <option disabled selected value="">
              Select Department
            </option>
            <option value="EEE">EEE</option>
            <option value="CSE">CSE</option>
            <option value="ICE">ICE</option>
            <otpion value="MSE">MSE</otpion>
            <option value="ACCE">ACCE</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {user.roles.includes("faculty-member") ? (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Designatiion</span>
            </label>
            <select
              className="select select-bordered select-accent mt-2"
              onChange={(e) =>
                setUser({ ...user, designation: e.target.value })
              }
              required
            >
              <option disabled selected value="">
                Select Designation
              </option>
              <option value="Professor">Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Other">Other</option>
            </select>
          </div>
        ) : (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Session (e.g. 2017-18)</span>
            </label>
            <input
              type="text"
              placeholder="Format: YYYY-YY (e.g. 2019-20)"
              className="input input-bordered input-accent"
              onChange={(e) => setUser({ ...user, session: e.target.value })}
              required
            />
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <Link href="/join/3" type="reset" className="btn btn-accent my-5">
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

export default Join31;
